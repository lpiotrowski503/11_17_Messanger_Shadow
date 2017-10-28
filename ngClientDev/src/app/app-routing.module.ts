import { RoomComponent } from './components/chat/room/room.component'
import { ChatComponent } from './components/chat/chat.component'
import { AuthGuard } from './guards/auth.guard'
import { ProfileComponent } from './components/profile/profile.component'
import { UsersComponent } from './components/chat/users/users.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// canActivate autorization guard
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'chat',
    component: ChatComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: RoomComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: HomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
