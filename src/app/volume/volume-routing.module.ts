import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VolumeCreateComponent } from "./volume-create/volume-create.component";
import { VolumeDetailsComponent } from "./volume-details/volume-details.component";
import { VolumeEditComponent } from "./volume-edit/volume-edit.component";

const routes: Routes = [
    { path: '/create', component: VolumeCreateComponent },
    { path: '/edit', component: VolumeEditComponent },
    { path: '/:id', component: VolumeDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VolumeRoutingModule { }