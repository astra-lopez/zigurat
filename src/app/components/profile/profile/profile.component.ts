import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { concatMap, tap } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { FollowButtonComponent } from '../../buttons/follow-button/follow-button.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [FollowButtonComponent, RouterLink, RouterLinkActive, RouterOutlet],
})
export class ProfileComponent  implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  profile!: Profile;
  currentUser!: User;
  isUser!: boolean;
  ngOnInit() {
    this.route.data.pipe(
      concatMap((data) => {
        this.profile = data['profile'];
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        ));
      })
    ).subscribe();
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

}
