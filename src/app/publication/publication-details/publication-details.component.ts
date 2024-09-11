import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Publication from 'src/app/entities/publication.entity';
import Volume from 'src/app/entities/volume.entity';
import { AuthService } from 'src/app/services/auth.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.css']
})
export class PublicationDetailsComponent implements OnInit, OnDestroy {

  public publication: Publication | undefined = undefined;
  public volumes: Volume[] = []
  public isLoggedIn = this.authService.loggedIn();
  public displayedColumns = ['volume', 'issue', 'details'];

  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(
    private publicationService: PublicationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.publicationService.getById(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(publication =>{
        this.publication = publication;
        this.volumes = publication.volumes;
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(false);
    this.unsubscriber$.complete();
  }

  disable() {
    return !(this.isLoggedIn && this.publication?.source.toLowerCase() !== 'hrčak');
  }

  deletePublication() {
    this.publicationService.delete(this.publication!.id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(_ => this.router.navigate(['/publications']));
  }
}
