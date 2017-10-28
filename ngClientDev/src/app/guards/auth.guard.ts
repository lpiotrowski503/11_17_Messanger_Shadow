import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}


    // guard method for verification logged or not
    canActivate() {
        if (this.auth.loggedIn()) {
            return true;

        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
