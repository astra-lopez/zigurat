import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleListConf } from 'src/app/interfaces/article-list-conf';
import { Profile } from 'src/app/interfaces/profile';
import { ArticleListComponent } from '../../article-aux/article-list/article-list.component';

@Component({
  standalone: true,
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
  imports: [ArticleListComponent]
})
export class ProfileFavoritesComponent  implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  profile!: Profile;
  favoritesConfig: ArticleListConf = {
    type: 'all',
    filters: {}
  };

  ngOnInit() {
    this.route.parent?.data
      .subscribe(
        data => {
          this.profile = data['profile'];
          this.favoritesConfig.filters.favorited = this.profile.username;
        }
      )
  }

}
