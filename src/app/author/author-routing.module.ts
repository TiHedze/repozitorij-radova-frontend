import { RouterModule, Routes } from "@angular/router";
import { AuthorListComponent } from "./author-list/author-list.component";
import { NgModule } from "@angular/core";
import { AuthorCreateComponent } from "./author-create/author-create.component";
import { AuthorDetailsComponent } from "./author-details/author-details.component";
import { AuthorEditComponent } from "./author-edit/author-edit.component";
import { AuthGuard } from "../services/guards/auth.guard";

const routes: Routes = [
    { path: '', component: AuthorListComponent },
    { path: 'create', component: AuthorCreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: AuthorEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: AuthorDetailsComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthorRoutingModule { }