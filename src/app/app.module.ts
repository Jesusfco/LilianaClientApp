import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.route';

import { AppComponent } from './app.component';

import { NavegationComponent } from './navegation/navegation.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    NavegationComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, 
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
