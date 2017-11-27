import { Injectable } from '@angular/core'

@Injectable()
export class ValidateService {
  constructor() {}

  // validation inserted data
  validateRegister(user) {
    if (user.nick === '' || user.pass === '') {
      return false
    } else {
      return true
    }
  }
}
