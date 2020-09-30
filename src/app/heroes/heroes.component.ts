import { Component, OnInit } from '@angular/core';
import { Hero } from '../constants/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { } 
  //simultaneously defines a private prop and identifies as injection site, sets param heroService to singleton instance of HeroService

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes(); //syncronous
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); 
    //async - waits for observable to emit array, subscribe passes emitted array to callback and sets component's hero prop
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
}
