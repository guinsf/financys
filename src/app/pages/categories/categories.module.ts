import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list';
import { CategoryFormComponent } from './category-form';

import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    CategoryListComponent, 
    CategoryFormComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule    
  ],
  providers:[
  ]
})
export class CategoriesModule { }
