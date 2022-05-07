import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { User } from '../../users/shared/user.model';
import { UserService } from '../../users/shared/user.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resources-form/base-resource-form.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent extends BaseResourceFormComponent<User> {  

  constructor(
    protected userService: UserService,
    protected injector : Injector) { 

    super(injector, new User(), userService, User.fromJson)
  }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      const result = await this.userService.createAccount(this.resource);
      console.log(`Login efetuado: ${result}`);

      // navego para a rota vazia novamente
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }
}
