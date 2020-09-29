import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../constants/hero';
import { HEROES } from '../constants/mock-heroes';
import { MessageService } from '../message/message.service';

@Injectable({ //metadata object
  providedIn: 'root'
})
export class HeroService {
  constructor(private messageService: MessageService) { } //service-in-service

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES); //emits a single value, array of mock heroes
  }
}
