import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public publicationNameControl = new FormControl('');
  public summaryControl = new FormControl('');
  public authorNameControl = new FormControl('');
  public articleNameControl = new FormControl('');
  public volumeNameControl = new FormControl('');
  public yearControl = new FormControl('')
  public searchForm = this.formBuilder.group({
    publicationName: this.publicationNameControl,
    summaryText: this.summaryControl,
    volumeName: this.volumeNameControl,
    authorName: this.authorNameControl,
    articleName: this.articleNameControl
  });
  constructor(
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }
  onSubmit() {

    const publicationName = this.publicationNameControl.value!;
    const summaryText = this.summaryControl.value!;
    const volumeName = this.volumeNameControl.value!;
    const authorName = this.authorNameControl.value!;
    const articleName = this.articleNameControl.value!;
    const year = this.yearControl.value! as number;

    console.log({publicationName, summaryText, volumeName, authorName, articleName})
    this.router.navigate(
      ['/articles'],
      {
        queryParams: {
          publicationName,
          summaryText,
          volumeName,
          authorName,
          articleName,
          year
        } as Params
      }
    );
  }
}
