import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthorService } from 'src/app/services/author.service';
import { CreateAuthorRequest } from 'src/app/services/requests/author/create-author.request';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css']
})
export class AuthorCreateComponent implements OnInit, OnDestroy {

  public firstNameControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public lastNameControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public createAuthorForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl
  });

  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(
    private authorService: AuthorService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(false);
    this.unsubscriber$.complete();
  }

  public onSubmit() {
    this.authorService.create({ 
      firstName: this.firstNameControl.value!, 
      lastName: this.lastNameControl.value! } as CreateAuthorRequest)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(value => this.router.navigate(['authors', value.id]));
  }
}
