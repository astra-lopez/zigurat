import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileResolverService } from 'src/app/services/profile-resolver.service';
import { ProfileArticlesComponent } from '../profile-articles/profile-articles.component';

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolverService
    },
    children: [
      {
        path: '',
        component: ProfileArticlesComponent
      },
      {
        path: 'favorites',
        component: ProfileArticlesComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
