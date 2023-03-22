import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./modules/auth/auth.guard";
import {HomeComponent} from "./modules/home/home.component";
import {ProductListComponent} from "./modules/product-list/product-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductListComponent, canActivate: [AuthGuard], data: {roles: ["USER", "ADMIN"]} },
  {path: "home", component: HomeComponent, canActivate: [AuthGuard], data: {roles: ["USER", "ADMIN"]}},
  {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
