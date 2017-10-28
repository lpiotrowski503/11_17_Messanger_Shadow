import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  // validation inserted data
  validateRegister(user) {
    if (user.nick === undefined || user.pass === undefined) {
      return false;

    } else {
      return true;
    }
  }
}
