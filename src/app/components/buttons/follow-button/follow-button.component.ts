import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, of, tap } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile';
import { ProfilesService } from 'src/app/services/profiles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  standalone: true,
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent {

  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) { }
  
  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated
      .pipe(concatMap(
        (authenticated) => {
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }

          // Debe haber una mejor manera de hacer esto
          if (!this.profile.following) {
            return this.profilesService
              .follow(this.profile.username)
              .pipe(tap(
                data => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                err => this.isSubmitting = false
              ));
          } else {
            return this.profilesService.unfollow(this.profile.username)
              .pipe(tap(
                datA => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                err => this.isSubmitting = false
              ))
          }
        }
      )).subscribe();
  }
}
