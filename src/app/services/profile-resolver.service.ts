import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Profile } from '../interfaces/profile';
import { ProfilesService } from './profiles.service';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<Profile> {

  constructor(
    private profilesService: ProfilesService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.profilesService
      .get(route.params['username'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')))
  }
}
