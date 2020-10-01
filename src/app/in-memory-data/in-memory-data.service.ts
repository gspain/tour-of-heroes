import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../constants/hero';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService {
  createDb() {
    const heroes = [
        { id: 11, name: 'Dr Scrubs' },
        { id: 12, name: 'Turkey' },
        { id: 13, name: 'Blimp' },
        { id: 14, name: 'Dr. Strange' },
        { id: 15, name: 'Wolverine' },
        { id: 16, name: 'Mister Soup' },
        { id: 17, name: 'Saitama' },
        { id: 18, name: 'Rider Hibiki' },
        { id: 19, name: 'Newman' },
        { id: 20, name: 'Ramen' }
    ]
    return {heroes};
  }

  //Overrides the genId method to ensure that a hero always has an id.
  //If the heroes array is empty, the method below returns the initial number (11)
  //If the heroes array is not empty. the method below returns the highest hero id + 1
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
