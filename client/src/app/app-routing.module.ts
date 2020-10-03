import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from "./shared/layouts/site-layout/site-layout.component";
import { NewsPageComponent } from "./pages/news-page/news-page.component";
import { CreateNewsPageComponent } from "./pages/create-news-page/create-news-page.component";
import { UpdateNewsPageComponent } from "./pages/update-news-page/update-news-page.component";
import { NewsSinglePageComponent } from "./pages/news-single-page/news-single-page.component";

const routes: Routes = [
  { path: '', component: SiteLayoutComponent, children: [
    { path: '', redirectTo: '/news', pathMatch: 'full' },
    { path: 'news', component: NewsPageComponent },
    { path: 'create', component: CreateNewsPageComponent },
    { path: 'update-news', component: UpdateNewsPageComponent },
    { path: 'news-single', component: NewsSinglePageComponent },
    { path: '**', redirectTo: '/news', pathMatch: 'full'}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
