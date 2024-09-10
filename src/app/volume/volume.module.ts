import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeCreateComponent } from './volume-create/volume-create.component';
import { VolumeEditComponent } from './volume-edit/volume-edit.component';
import { VolumeDetailsComponent } from './volume-details/volume-details.component';
import { SharedModule } from '../shared/shared.module';
import { VolumeRoutingModule } from './volume-routing.module';



@NgModule({
  declarations: [
    VolumeCreateComponent,
    VolumeEditComponent,
    VolumeDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VolumeRoutingModule
  ]
})
export class VolumeModule { }
