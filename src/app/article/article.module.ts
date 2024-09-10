import { NgModule } from '@angular/core';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ArticleCreateComponent,
    ArticleEditComponent,
    ArticleDetailsComponent,
    ArticleListComponent
  ],
  imports: [
    SharedModule,
    ArticleRoutingModule,
    ReactiveFormsModule
  ]
})
export class ArticleModule { }
