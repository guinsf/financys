import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resources-list/base-resource-list.components';
import { Budget } from '../shared/budget.model';
import { BudgetService } from '../shared/budget.service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent extends BaseResourceListComponent<Budget> implements OnInit {

  budgetForm: FormGroup;

  budget: Budget = new Budget();

  constructor(
    private budgetService: BudgetService, 
    private formBuilder: FormBuilder) { 

    super(budgetService)
  }

  ngOnInit() {
    this.loadBudgets();
    this.loadBudgetForm();
  }  

  search(): void{

    const bugetName : String = this.budgetForm.value.name;

    if ( bugetName == null || bugetName == ""){
      this.loadBudgets();
    }
    else {
      this.resources = this.resources.filter(e => e.name.toLowerCase().startsWith(bugetName.toLowerCase()))
    }
  }

  // PRIVATE METHODS
  private loadBudgets() {
    this.budgetService.getAll().subscribe(
      resources => this.resources = resources.sort((a,b) => b.id - a.id),
      error => alert('Erro ao carregar a lista')
    );
  }

  private loadBudgetForm() {
    this.budgetForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.minLength(2)]],
      description: [null, [Validators.minLength(2)]]
    });
  }
}
