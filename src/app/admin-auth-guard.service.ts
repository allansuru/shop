import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AuthService } from 'shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable, Component } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
   return this.auth.appUser$
    .map(appUser => appUser.isAdmin);
  }

}
