import { Component, OnInit } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resources-list/base-resource-list.components';
import { Category, CategoryService } from '../shared';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  constructor(protected categoryService: CategoryService) {
    super(categoryService)
  }  
}
