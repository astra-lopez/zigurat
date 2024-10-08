import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleListConf } from 'src/app/interfaces/article-list-conf';
import { Profile } from 'src/app/interfaces/profile';
import { ArticleListComponent } from '../../article-aux/article-list/article-list.component';

@Component({
  standalone: true,
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.scss'],
  imports: [ArticleListComponent],
})
export class ProfileArticlesComponent  implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  profile!: Profile;
  articlesConfig: ArticleListConf = {
    type: 'all',
    filters: {}
  }

  ngOnInit() {
    this.route.parent?.data
      .subscribe(data => {
        this.profile = data['profile'];
        this.articlesConfig = {
          type: 'all',
          filters: {}
        };
        this.articlesConfig.filters.author = this.profile.username;
      })
  }

}
