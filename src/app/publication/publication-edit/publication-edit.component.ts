import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Publication from 'src/app/entities/publication.entity';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.css']
})
export class PublicationEditComponent implements OnInit, OnDestroy {

  public titleControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public sourceControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  private publication: Publication | undefined = undefined;
  private unsubscriber$: Subject<boolean> = new Subject();

  public editPublicationForm = this.formBuilder.group({
    title: this.titleControl,
    source: this.sourceControl
  })

  constructor(
    private publicationService: PublicationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.publicationService.getById(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(publication => {
        this.publication = publication;
        this.titleControl.setValue(publication.title);
        this.sourceControl.setValue(publication.source);
      })
  }

  ngOnDestroy(): void {
      this.unsubscriber$.next(false);
      this.unsubscriber$.complete();
  }

  onSubmit() {
    const title = this.titleControl.value!;
    const source = this.sourceControl.value!;

    this.publication!.title = title;
    this.publication!.source = source;

    this.publicationService.update(this.publication!)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(response => this.router.navigate(['/publications',response.id]));
  }
}
