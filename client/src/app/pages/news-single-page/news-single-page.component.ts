import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from "@angular/router";
import { NewsService } from "../../shared/services/news.service";

@Component({
  selector: 'app-news-single-page',
  templateUrl: './news-single-page.component.html',
  styleUrls: ['./news-single-page.component.scss']
})
export class NewsSinglePageComponent implements OnInit {

  isLoggedIn = false;
  userId;

  news;

  // -- remove news --
  removedNewsData;
  isVisibleRemoveNewsPopup = false;
  // -- remove news --

  constructor( private activatedRoute: ActivatedRoute,
               private newsService: NewsService,
               private router: Router ) { }

  ngOnInit() {
    if(localStorage.getItem('isLoggedIn')){
      this.isLoggedIn = true;
      this.userId = localStorage.getItem('userId');
    }
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.newsService.getNewsById(params.id).subscribe(data => {
        this.news = data;
        this.news.jobTimeDiffCalc = this.timeDiffCalc(new Date(this.news.created), new Date());
      })
    })
  }

  updateNews(item){
    this.router.navigate(['update-news'], {queryParams: {id : item._id}});
  }

  removeNewsToggle(item){
    this.removedNewsData = item;
    this.isVisibleRemoveNewsPopup = true;
  }

  removeNews(){
    this.newsService.removeNews(this.removedNewsData).subscribe(data => {
      this.isVisibleRemoveNewsPopup = false;
      this.router.navigate(['news']);
    })
  }

  timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    // console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    // console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    //  console.log('minutes', minutes);

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }

    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

    return difference;
  }

}
