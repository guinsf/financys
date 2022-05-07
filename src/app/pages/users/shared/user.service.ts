
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseResourceService<User> {

  constructor(protected injector: Injector) { 
    super("api/users", injector, User.fromJson);
  }  

  login(userLogin : User) {
    
    this.getAll().pipe(
      map( users =>  this.filterByEmailAndPassword(users, userLogin)),      
      catchError(this.handleError)
    )

    return new Promise((resolve) => {
      window.localStorage.setItem('token', 'finansys-token');
      resolve(true);
    });
  }

  /* async login(user : User) {
    const url = `${this.apiPath}/auth/login`;

    const result =  await this.http.post<any>(url, user).toPromise();

    if (result && result.access_token) {
      window.localStorage.setItem('token', result.access_token);
      return true;
    }

    return false;
  } */

  createAccount(user : User){
    return new Promise((resolve) => {
      super.create(user);
      resolve(true);
    });
  }

  private filterByEmailAndPassword(users: User[], userLogin : User) {
    return users.filter(user => {      
      if (user.email == userLogin.email && user.password == userLogin.password)
          return true;
      else
        return false;
    })
  }

  
}
