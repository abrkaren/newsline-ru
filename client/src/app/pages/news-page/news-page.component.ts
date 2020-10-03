import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { NewsService } from "../../shared/services/news.service";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  isLoggedIn = false;
  userId;

  news;

  // -- remove news --
  removedNewsData;
  isVisibleRemoveNewsPopup = false;
  // -- remove news --

  constructor( private newsService: NewsService,
               private router: Router ) { }

  ngOnInit() {
    if(localStorage.getItem('isLoggedIn')){
      this.isLoggedIn = true;
      this.userId = localStorage.getItem('userId');
    }
    this.getNews();
  }

  getNews(){
     this.newsService.getNews().subscribe((data) => {
        this.news = data;
        this.news.forEach(item => {
           item.jobTimeDiffCalc = this.timeDiffCalc(new Date(item.created), new Date());
        })
     })
  }

  removeNewsToggle(item){
    this.removedNewsData = item;
    this.isVisibleRemoveNewsPopup = true;
  }

  removeNews(){
    this.newsService.removeNews(this.removedNewsData).subscribe(data => {
      this.news = this.news.filter(item => item._id !== this.removedNewsData._id);
      this.isVisibleRemoveNewsPopup = false;
    })
  }

  updateNews(item){
    this.router.navigate(['update-news'], {queryParams: {id : item._id}});
  }

  onEvent(event, news) {
    this.goToNewsSingle(news);
    event.stopPropagation();
  }

  goToNewsSingle(news) {
    this.router.navigate(['news-single'], {queryParams: {id : news._id}});
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
