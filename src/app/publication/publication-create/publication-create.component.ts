import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication-create',
  templateUrl: './publication-create.component.html',
  styleUrls: ['./publication-create.component.css']
})
export class PublicationCreateComponent implements OnInit, OnDestroy {
  public titleControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public sourceControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public createPublicationForm = this.formBuilder.group({
    title: this.titleControl,
    source: this.sourceControl
  });

  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(false);
    this.unsubscriber$.complete();
  }

  onSubmit() {
      const title = this.titleControl.value!;
      const source = this.sourceControl.value!;

      this.publicationService.create({title, source})
        .pipe(takeUntil(this.unsubscriber$))
        .subscribe(value => this.router.navigate(['/publications', value.id]));
  }
}
