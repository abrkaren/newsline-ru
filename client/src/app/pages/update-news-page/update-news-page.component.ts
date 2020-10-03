import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsService } from "../../shared/services/news.service";
import { ActivatedRoute, Router, Params } from "@angular/router";


@Component({
  selector: 'app-update-news-page',
  templateUrl: './update-news-page.component.html',
  styleUrls: ['./update-news-page.component.scss']
})
export class UpdateNewsPageComponent implements OnInit {

  updateNewsForm: FormGroup;

  updatedNewsData;
  isVisibleSuccessAlert = false;

  constructor( private activatedRoute: ActivatedRoute,
               private router: Router,
               private fb: FormBuilder,
               private newsService: NewsService ) { }

  ngOnInit(){
    if(!localStorage.getItem('isLoggedIn')){
      this.router.navigate(['/news']);
    }
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.newsService.getNewsById(params.id).subscribe(data => {
        this.updatedNewsData = data;

        this.updateNewsForm = this.fb.group({
          title: [this.updatedNewsData.title, [Validators.required]],
          content: [this.updatedNewsData.content, [Validators.required]],
          createdBy: [this.updatedNewsData.createdBy],
          createdByUserName: [this.updatedNewsData.createdByUserName],
          _id: [this.updatedNewsData._id]
        })

      })
    })

    this.formControlsUpdateNewsForm();
  }

  formControlsUpdateNewsForm(){
    this.updateNewsForm = this.fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      createdBy: [null],
      createdByUserName: [null],
      _id: [null]
    })
  }

  submitUpdateNewsForm() {
    this.newsService.updateNews(this.updateNewsForm.value).subscribe(data => {
      this.isVisibleSuccessAlert = true;
      setTimeout(()=>{
        this.router.navigate(['/news']);
      }, 500);
    })
  }

}
