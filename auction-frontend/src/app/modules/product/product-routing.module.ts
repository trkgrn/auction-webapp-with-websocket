import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductAddComponent} from "./product-add/product-add.component";
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ProductListComponent,canActivate: [AuthGuard], data: {roles: ["USER", "ADMIN"]}},
  {path: 'add', component: ProductAddComponent,canActivate: [AuthGuard], data: {roles: ["ADMIN"]}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
