import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: '', // nomesite.com/categories => list (master)
    component: CategoryListComponent
  },
  {
    path: ':new', // nomesite.com/categories/new => form (master)
    component: CategoryFormComponent
  },
  {
    path: ':id/edit', // nomesite.com/:id/edit => form (master)
    component: CategoryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
