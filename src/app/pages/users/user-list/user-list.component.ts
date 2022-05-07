import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resources-list/base-resource-list.components';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent  extends BaseResourceListComponent<User> implements OnInit {

  userForm: FormGroup;

  user: User = new User();

  constructor(
    private userService: UserService, 
    private formBuilder: FormBuilder) { 

    super(userService)
  }

  ngOnInit() {
    this.loadUsers();
    this.loadUserForm();
  }  

  search(): void{

    const userName : String = this.userForm.value.name;
    const userEmail : String = this.userForm.value.email;

    if (this.hasNotNameAndEmail(userName, userEmail)){
      this.loadUsers();
    }
    else if (this.hasNameAndNotEmail(userName, userEmail)){
      this.resources = this.resources.filter(e => e.name.toLowerCase().startsWith(userName.toLowerCase()))  
    }   
    else if (this.hasEmailAndNotName(userEmail, userName)){
      this.resources = this.resources.filter(e => e.email.toLowerCase().startsWith(userEmail.toLowerCase()))
    } 
    else{
      this.resources = this.resources.filter(e => e.email.toLowerCase().startsWith(userEmail.toLowerCase()) &&
                                          e.name.toLowerCase().startsWith(userName.toLowerCase()))
    }
  }

  // PRIVATE METHODS
  private loadUsers() {
    this.userService.getAll().subscribe(
      resources => this.resources = resources.sort((a,b) => b.id - a.id),
      error => alert('Erro ao carregar a lista')
    );
  }

  private loadUserForm() {
    this.userForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.minLength(2)]],
      email: [null, [Validators.minLength(2)]]
    });
  }

  private hasEmailAndNotName(userEmail: String, userName: String) {
    return (userEmail != null || userEmail != '') && (userName == null || userName == '');
  }

  private hasNameAndNotEmail(userName: String, userEmail: String) {
    return (userName != null || userName != '') && (userEmail == null || userEmail == '');
  }

  private hasNotNameAndEmail(userName: String, userEmail: String) {
    return (userName == null || userName == '') && (userEmail == null || userEmail == '');
  }

}
