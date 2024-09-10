import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: ArticleListComponent },
    { path: 'create', component: ArticleCreateComponent },
    { path: 'edit/:id', component: ArticleEditComponent },
    { path: ':id', component: ArticleDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule { }