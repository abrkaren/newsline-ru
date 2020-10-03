import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsService } from "../../shared/services/news.service";

@Component({
  selector: 'app-create-news-page',
  templateUrl: './create-news-page.component.html',
  styleUrls: ['./create-news-page.component.scss']
})
export class CreateNewsPageComponent implements OnInit {

  userId;
  userName;
  createNewsForm: FormGroup;

  constructor( private router: Router,
               private fb: FormBuilder,
               private newsService: NewsService ) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')){
      this.userId = localStorage.getItem('userId');
      this.userName = localStorage.getItem('userName');
    }else{
      this.router.navigate(['/news']);
    }
    this.formControlsCreateNewsForm();
  }

  formControlsCreateNewsForm(){
    this.createNewsForm = this.fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      createdBy: [this.userId],
      createdByUserName: [this.userName]
    })
  }

  submitCreateNewsForm(){
    this.createNewsForm.disable();

    this.newsService.createNews(this.createNewsForm.value).subscribe(data => {
      // console.log(data);
      this.createNewsForm.reset();
      this.createNewsForm.enable();
      this.router.navigate(['/news']);
    })
  }
  
}
