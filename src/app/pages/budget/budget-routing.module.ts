import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetListComponent } from './budget-list/budget-list.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetListComponent
  },
  {
    path: 'new',
    component: BudgetFormComponent
  },
  {
    path: ':id/edit',
    component: BudgetFormComponent
  },
  {
    path: ':id/details',
    component: BudgetFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
