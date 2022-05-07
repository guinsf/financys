import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '', // nomesite.com/users => list (master)
    component: UserListComponent
  },
  {
    path: ':new', // nomesite.com/users/new => form (master)
    component: UserFormComponent
  },
  {
    path: ':id/edit', // nomesite.com/:id/edit => form (master)
    component: UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
