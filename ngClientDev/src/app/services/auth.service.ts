import { ChatService } from './chat.service'
import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
// import 'rxjs/add/operator/map'
import 'rxjs/Rx'
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {
  authToken: any
  user: any

  constructor(private http: Http, private chat: ChatService) {}

  // method for logging and rejestration
  signUser(user, url) {
    const header = new Headers()
    header.append('Content-Type', 'application/json; charset=utf-8')
    return this.http
      .post(`/${url}`, user, { headers: header })
      .map(res => res.json())
  }

  // go to profile page
  getHttp(url) {
    const header = new Headers()
    this.loadToken()
    header.append('Authorization', this.authToken)
    header.append('Content-Type', 'application/json')
    return this.http.get(`/${url}`, { headers: header }).map(res => res.json())
  }

  // load token from local storage for authorization
  loadToken() {
    const token = localStorage.getItem('id_token')
    this.authToken = token
  }

  // return user id token if user logged
  loggedIn() {
    return tokenNotExpired('id_token')
  }

  // save user data in local strorage
  saveUserData(token, user) {
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  // log out user
  logOut() {
    this.authToken = null
    this.user = null
    this.chat.userLoggedEmiter(false)
    this.chat.emiter('getUsers', 'getLoggedUsers')
    this.chat.disconnect()
    localStorage.clear()
  }
}
