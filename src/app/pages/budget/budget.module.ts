import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BudgetListComponent, 
    BudgetFormComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
