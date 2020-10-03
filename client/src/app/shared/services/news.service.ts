import { Injectable } from '@angular/core';
import { Observable } from "rxjs/index";
import { HttpClient } from '@angular/common/http'
import { News } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient ) { }

  createNews(data): Observable<News> {
    return this.http.post<News>('/api/news', data)
  }

  getNews(): Observable<News>{
    return this.http.get<News>('/api/news');
  }

  removeNews(data): Observable<News>{
    return this.http.delete<News>(`/api/news/${data._id}`);
  }

  getNewsById(id){
    return this.http.get('/api/news/getNewsById/' + id);
  }

  updateNews(data): Observable<News>{
    return this.http.put<News>(`/api/news/${data._id}`, data);
  }

}
