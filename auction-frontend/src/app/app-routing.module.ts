import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./modules/auth/auth.guard";
import {HomeComponent} from "./modules/home/home.component";

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard], data: {roles: ["USER", "ADMIN"]}},
  {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  {path: 'products', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule), canActivate: [AuthGuard], data: {roles: ["USER", "ADMIN"]}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
