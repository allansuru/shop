import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase';
@Injectable()
  export class AuthService {

 user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

login () {
  let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  localStorage.setItem('returnUrl', returnUrl);

  this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
}

logout() {
  this.afAuth.auth.signOut();
}

get appUser$(): Observable<AppUser> {
  return this.user$
  .switchMap(user => {
    if (user) {
      return this.userService.get(user.uid);
    }
    return Observable.of(null) ;
  });
}

}
