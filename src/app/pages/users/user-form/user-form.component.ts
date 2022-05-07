import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from '../../../shared/components/base-resources-form/base-resource-form.component';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BaseResourceFormComponent<User> {

  constructor(
    protected userService: UserService,
    protected injector : Injector
  ) { 
    super(injector, new User(), userService, User.fromJson)
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  creationPageTitle() : string{
    return "Cadastro de Novo Usuário";
  }  

  editionPageTitle() : string {
    const entryName = this.resource.name || ""
    return "Editando Usuário: " + entryName;
  }
}
