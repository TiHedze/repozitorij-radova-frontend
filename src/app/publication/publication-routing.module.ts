import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PublicationCreateComponent } from "./publication-create/publication-create.component";
import { PublicationDetailsComponent } from "./publication-details/publication-details.component";
import { PublicationEditComponent } from "./publication-edit/publication-edit.component";
import { PublicationListComponent } from "./publication-list/publication-list.component";
import { AuthGuard } from "../services/guards/auth.guard";

const routes: Routes = [
    { path: '', component: PublicationListComponent },
    { path: 'create', component: PublicationCreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: PublicationEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: PublicationDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicationRoutingModule { }