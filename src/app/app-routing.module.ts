import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'categories',
    loadChildren: './pages/categories/categories.module#CategoriesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: './pages/account/account.module#AccountModule'
  },
  {
    path: 'entries', 
    loadChildren: './pages/entries/entries.module#EntriesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: './pages/users/users.module#UsersModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: './pages/reports/reports.module#ReportsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'budget',
    loadChildren: './pages/budget/budget.module#BudgetModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/reports',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
