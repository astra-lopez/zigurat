import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Article } from 'src/app/interfaces/article';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss'],
})
export class ArticleMetaComponent {
  @Input() article!: Article;

  constructor(
    
  ) { }
}
