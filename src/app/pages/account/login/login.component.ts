import { Component, Injector, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';

import { User } from '../../users/shared/user.model';
import { UserService } from '../../users/shared/user.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resources-form/base-resource-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseResourceFormComponent<User>  implements OnInit {  

  constructor(
    protected userService: UserService,
    protected injector : Injector) { 

    super(injector, new User(), userService, User.fromJson)
  }

  async onSubmit() {
    try {

      const result = await this.userService.login(this.resource)

      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  protected setCurrentAction() {
    
  }
}
