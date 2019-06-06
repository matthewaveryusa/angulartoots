import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = pick_random(4, heroes));
  }

}

//reservoir sampling
function pick_random(n: number, arr: any[]): any[] {
  if (arr.length <= n) {
    return arr;
  }

  const ret = arr.slice(1, n);
  for (let i = n - 1; i < arr.length; ++i) {
    const r = Math.floor(Math.random() * i);
    if ( r < n) {
      ret[r] = arr[i];
    }
  }
  return ret;
}

