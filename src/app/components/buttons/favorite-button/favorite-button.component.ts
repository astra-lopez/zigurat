import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, of, tap } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ArticlesService } from 'src/app/services/articles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  standalone: true,
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
  imports: [CommonModule],
})
export class FavoriteButtonComponent {

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) { }

  @Input() article!: Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated
      .pipe(concatMap(
        (authenticated, _) => {
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }

          if (!this.article.favorited) {
            return this.articlesService
              .favorite(this.article.slug)
              .pipe(tap(
                data => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                err => this.isSubmitting = false
              ));
          } else {
            return this.articlesService
              .unfavorite(this.article.slug)
              .pipe(tap(
                data => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                err => this.isSubmitting = false
              ));
          }
        }
      )).subscribe()
  }
}
