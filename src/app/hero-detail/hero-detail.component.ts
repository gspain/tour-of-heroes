import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //current route info
import { Location } from '@angular/common'; //interacting with the browser
import { Hero } from '../constants/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { } //reserve for simple initializations

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id'); 
    //route.snapshot = static image of route info after comp was created
    //paramMap = dictionary of route param values from url
    //+ converts string to number
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}
