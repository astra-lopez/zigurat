import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ArticleListConf } from '../interfaces/article-list-conf';
import { Article } from '../interfaces/article';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private apiService: ApiService
  ) { }

  query(config: ArticleListConf): Observable<{articles: Article[], articlesCount: number}> {
    // Convert filters to search params
    const params: any = {};
    
    Object
      .keys(config.filters)
      .forEach((key) => {
        params[key] = (config.filters as any)[key];         // oh boy.
      });

    return this.apiService
      .get(
        '/artucles' + ((config.type === 'feed') ? '/feed' : ''),
        new HttpParams({ fromObject: params })
      );
  }

  get(slug: string): Observable<Article> {
    return this.apiService.get('/articles/' + slug)
      .pipe(map(data => data.article));
  }

  destroy(slug: string) {
    return this .apiService.delete('/articles/' + slug);
  }

  save(article: Article): Observable<Article> {
    // In case we are updating an article
    if (article.slug) {
      return this.apiService
        .put('/articles/' + article.slug, {article: article})
        .pipe(map(data => data.article));
    } else {  // otherwise, create the article
      return this.apiService
        .post('/articles/', {article: article})
        .pipe(map(data => data.article))
    }
  }

  favorite(slug: string): Observable<Article> {
    return this.apiService
      .post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug: string): Observable<Article> {
    return this.apiService
      .delete('/articles/' + slug + '/favorite');
  }
}
