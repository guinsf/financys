import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resources-form/base-resource-form.component';
import { Budget } from '../shared/budget.model';
import { BudgetService } from '../shared/budget.service';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent extends BaseResourceFormComponent<Budget>{
    
  constructor(
    protected budgetService: BudgetService,
    protected injector : Injector) { 

    super(injector, new Budget(), budgetService, Budget.fromJson);
  }  

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      amount: [null]
    });
  }

  creationPageTitle() : string{
    return "Cadastro de Novo Orçamento";
  }

  editionPageTitle() : string {
    const categoryName : string = this.resource.name || "";

    return "Editando Orçamento: " + categoryName;
  }

}
