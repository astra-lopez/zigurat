import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  swiperModules = [IonicSlides];
  
  constructor(
    private router: Router,
  ) {}

  tags: Array<String> = [];
  tagsLoaded = false;

}
