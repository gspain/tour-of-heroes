import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../constants/hero';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ //metadata object
  providedIn: 'root'
})

export class HeroService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private heroesUrl = 'api/heroes';

  //separated out because it's called frequently
  //logs a message with MessageService
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   *  Handle http operation that failed
   *  Let the app continue
   *  @param operation - name of the operation that failed
   *  @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      //let the app continue running by returning an empty result
      return of(result as T);
    }
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { } //service-in-service

  //GET hero by id, return `undefined` when id not found
  getNoHero404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl) //get array of heroes from api
      .pipe( //observable result - catchError intercepts failed observable.
        tap(_ => this.log('fetched heroes')), //taps into the flow of observable and send a message via the log method
        catchError(this.handleError<Hero[]>('getHeroes', [])) //reports error and return inocuous result
      );
  }

  //get hero by id. will 404 if id is not found
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  //PUT: update the hero on the server
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updatedHero'))
      );
  }

  //POST: add a new hero to the server
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)), 
        //server generates an id, returns in the Observable<Hero> to the caller
        catchError(this.handleError<Hero>(`addHero`))
      );
  }

  //DELETE: delete the hero from the server
  deleteHero(hero: Hero): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  //GET: heroes whose name contains search term
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      //if not search term, return empty hero array
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found heroes matching "${term}"`) : 
          this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }
}
