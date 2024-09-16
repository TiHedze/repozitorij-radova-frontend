import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Article from 'src/app/entities/article.entity';
import Volume from 'src/app/entities/volume.entity';
import { AuthService } from 'src/app/services/auth.service';
import { VolumeService } from 'src/app/services/volume.service';

@Component({
  selector: 'app-volume-details',
  templateUrl: './volume-details.component.html',
  styleUrls: ['./volume-details.component.css']
})
export class VolumeDetailsComponent implements OnInit, OnDestroy {

  public displayedColumns = ['title', 'authors', 'details'];
  public volume?: Volume | undefined = undefined;
  public articles: Article[] = [];
  
  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(
    private volumeService: VolumeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.volumeService.getById(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(volume => {
        this.volume = volume;
        this.articles = volume.articles;
      });

  }

  ngOnDestroy(): void {
      this.unsubscriber$.next(false);
      this.unsubscriber$.complete();
  }

  deleteVolume() {
    this.volumeService.delete(this.volume!.id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(_ => this.router.navigate(['/search']));
  }

  getAuthorNames(article: Article): string {
    return article.authors.map(author => `${author.firstName} ${author.lastName}`).join();
  }

  disable(): boolean {
    return !this.authService.loggedIn();
  }
}
