import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from "./shared/layouts/site-layout/site-layout.component";
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { CreateNewsPageComponent } from './pages/create-news-page/create-news-page.component';
import { NewsSinglePageComponent } from './pages/news-single-page/news-single-page.component';
import { UpdateNewsPageComponent } from './pages/update-news-page/update-news-page.component';
import { HeaderComponent } from './shared/components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    NewsPageComponent,
    CreateNewsPageComponent,
    NewsSinglePageComponent,
    UpdateNewsPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
