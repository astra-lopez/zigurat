import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleListConf } from 'src/app/interfaces/article-list-conf';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  query!: ArticleListConf;
  results!: Article[];
  currentPage!: number;
  loading = false;
  totalPages: Array<number> = [1];

  constructor(
    private articleService: ArticlesService
  ) { }

  @Input() limit!: number;
  @Input() set config(config: ArticleListConf) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = (this.limit * (this.currentPage - 1));
    }

    this.articleService
      .query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.results = data.articles;

        // Generar rango de páginas
        this.totalPages = Array.from(
          new Array(Math.ceil(data.articlesCount / this.limit)),
          (_val, index) => index
        )
      })
  }

}
