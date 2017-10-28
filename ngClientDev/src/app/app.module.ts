import { ChatService } from './services/chat.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/chat/users/users.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { RoomComponent } from './components/chat/room/room.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UsersComponent,
    ChatComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule,
    HttpModule,
    FormsModule,
  ],
  providers: [ValidateService, AuthService, ChatService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
