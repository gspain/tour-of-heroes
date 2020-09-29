import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../constants/hero';
import { HeroService } from '../hero/hero.service';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService, 
    private messageService: MessageService
  ) { } 
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

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
}
