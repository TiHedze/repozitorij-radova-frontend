import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import Author from 'src/app/entities/author.entity';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit, OnDestroy {
  public authors: Author[] = [];
  public displayedColumns = ['position', 'firstName', 'lastName', 'details'];

  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.authorService.getAll()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(authors => this.authors = authors);
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(false);
    this.unsubscriber$.complete();
  }
}
