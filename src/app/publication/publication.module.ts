import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationCreateComponent } from './publication-create/publication-create.component';
import { PublicationDetailsComponent } from './publication-details/publication-details.component';
import { PublicationEditComponent } from './publication-edit/publication-edit.component';
import { SharedModule } from '../shared/shared.module';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationRoutingModule } from './publication-routing.module';



@NgModule({
  declarations: [
    PublicationCreateComponent,
    PublicationDetailsComponent,
    PublicationEditComponent,
    PublicationListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PublicationRoutingModule
  ]
})
export class PublicationModule { }
