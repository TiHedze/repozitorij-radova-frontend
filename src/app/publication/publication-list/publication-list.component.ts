import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import Publication from 'src/app/entities/publication.entity';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit, OnDestroy {

  public publications: Publication[] = []
  public displayedColumns = ['position', 'title', 'source', 'details'];

  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.publicationService.getAll()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(publications => this.publications = publications);
  }

  ngOnDestroy(): void {
      this.unsubscriber$.next(false);
      this.unsubscriber$.complete();
  }
}
