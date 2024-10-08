import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleMetaComponent } from '../article-meta/article-meta.component';
import { FavoriteButtonComponent } from "../../buttons/favorite-button/favorite-button.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
  imports: [
    ArticleMetaComponent,
    FavoriteButtonComponent,
    RouterLink,
    CommonModule
  ],
})
export class ArticlePreviewComponent {
  @Input() article!: Article;

  onToggleFavorite(favorited: boolean) {
    this.article['favorited'] = favorited;

    if (favorited) {
      this.article['favoritesCount']++;
    } else {
      this.article['favoritesCount']--;
    }
  }

  constructor() { }

}
