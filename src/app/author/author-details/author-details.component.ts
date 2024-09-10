import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Author from 'src/app/entities/author.entity';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit, OnDestroy {

  public author?: Author | undefined = undefined;

  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.authorService.getById(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(author => this.author = author);
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(false);
    this.unsubscriber$.complete();
  }

}
