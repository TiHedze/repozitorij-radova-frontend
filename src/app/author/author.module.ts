import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorRoutingModule } from './author-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthorCreateComponent,
    AuthorDetailsComponent,
    AuthorEditComponent,
    AuthorListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthorRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthorModule { }
