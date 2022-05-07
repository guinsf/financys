import { Component, Injector, OnInit } from '@angular/core';
import {  Validators } from "@angular/forms";

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";

import { Category, CategoryService } from '../../categories/shared';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resources-form/base-resource-form.component';
import { switchMap } from 'rxjs/operators';
import { Budget } from '../../budget/shared/budget.model';
import { BudgetService } from '../../budget/shared/budget.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit{
  
  categories: Array<Category>;
  budgets: Array<Budget>;

  readOnlyForm = false;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: [ "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesShort: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: [ "Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
    monthNames: [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ],
    monthNamesShort: [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ],
    today: "Hoje",
    clear: "Limpar"
  }

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected budgetService : BudgetService,
    protected injector : Injector ) { 

      super(injector, new Entry(), entryService, Entry.fromJson)
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadCategories();
    this.loadBudgets();
  }

  get typeOptions(): Array<any>{
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return { 
          text: text,
          value: value
        }
      }
    );
  }

  protected setCurrentAction() {

    if(this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new"
    }
    else if (this.route.snapshot.url[1].path == "edit") {
      this.currentAction = "edit"
    }
    else{
      this.currentAction = "details"
      this.readOnlyForm = true;
    }
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null,[Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ["expense", [Validators.required] ],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
      categoryName: [null, [Validators.required]],
      budgetId: [null, [Validators.required]],
      budgetName: [null, [Validators.required]]
    });

    if (this.readOnlyForm) {
      this.resourceForm.disable();
    }
    
  }

  protected loadResource() {
    if (this.currentAction == "edit" || this.currentAction == "details") {
      
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get("id")))
      )
      .subscribe(
        (entry) => {
          this.resource = entry;
          this.resourceForm.patchValue(entry) // binds loaded entry data to EntryForm
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  private loadCategories(){
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

  private loadBudgets(){
    this.budgetService.getAll().subscribe(
      budgets => this.budgets = budgets
    );
  }

  protected setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = this.creationPageTitle();
    else if (this.currentAction == 'edit'){
      this.pageTitle = this.editionPageTitle();
    }
    else {
      this.pageTitle = this.detailsPageTitle();
    }
  }

  creationPageTitle() : string{
    return "Cadastro de Novo Lançamento";
  }

  detailsPageTitle() : string{
    return "Visualizando Lançamento";
  }

  editionPageTitle() : string {
    const entryName = this.resource.name || ""
    return "Editando Lançamento: " + entryName;
  }
}