import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private apiService: ApiService
  ) { }

  add(slug: string, payload: string): Observable<Comment> {
    return this.apiService
      .post(
        `/articles/${slug}/comments`,
        { comment: { body: payload } }
      ).pipe(map(data => data.comment));
  }

  getAll(slug: string): Observable<Comment[]> {
    return this.apiService
      .get(`/articles/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId: number, articleSlug: string) {
    return this.apiService
      .delete(`/articles/${articleSlug}/comments/${commentId}`);
  }
}
