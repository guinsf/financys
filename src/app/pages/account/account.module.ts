import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module'
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountRoutingModule } from './account-routing.module'
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    LoginComponent, 
    CreateAccountComponent,
    AuthenticationComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AccountRoutingModule   
  ],
  providers:[
  ]
})
export class AccountModule { }
