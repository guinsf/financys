import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list';
import { UserFormComponent } from './user-form';

import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    UserListComponent, 
    UserFormComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
