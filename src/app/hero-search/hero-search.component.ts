import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../constants/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})

export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  //rxjs subject - source of observable values and observable itself
  //can subscribe
  //can push values into it by calling next(value)
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  //push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms
      .pipe(
        //wait 300ms after each keystroke before considering the term
        debounceTime(300),
        //ignore new term if same as previous term - request sent only if text changes
        distinctUntilChanged(),
        //switch to new search observable each time the term changes
        switchMap((term: string) => this.heroService.searchHeroes(term))
      );
  }

}
