import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "./modules/auth/auth.guard";
import {AuthService} from "./services/auth.service";
import {RoleService} from "./services/role.service";
import {JwtInterceptor} from "./interceptors/JwtInterceptor";
import { HomeComponent } from './modules/home/home.component';
import {FormsModule} from "@angular/forms";
import { NavbarComponent } from './modules/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,
        FormsModule
    ],
  providers: [AuthGuard, AuthService, RoleService, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
