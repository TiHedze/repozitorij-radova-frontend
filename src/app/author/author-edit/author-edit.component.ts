import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Author from 'src/app/entities/author.entity';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit, OnDestroy {

  public firstNameControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public lastNameControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  public editAuthorForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl
  });

  public author: Author | undefined = undefined;
  private unsubscriber$: Subject<boolean> = new Subject();

  constructor(
    private authorService: AuthorService, 
    private router: Router, 
    private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.authorService.getById(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(author => {
        this.author = author;
        this.firstNameControl.setValue(author.firstName);
        this.lastNameControl.setValue(author.lastName);
      });
  }
  
  ngOnDestroy(): void {
    this.unsubscriber$.next(false);
    this.unsubscriber$.complete();
  }

  public onSubmit() {
    const firstName = this.firstNameControl.value!;
    const lastName = this.lastNameControl.value!;

    this.author!.firstName = firstName;
    this.author!.lastName = lastName;

    this.authorService.update(this.author!)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(value => this.router.navigate(['authors', value.id]));
  }
}
