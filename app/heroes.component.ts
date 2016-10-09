import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Greeting } from './greeting';

@Component({
	moduleId: module.id,
 	selector: 'my-heroes',
 	templateUrl: 'heroes.component.html',
 	styleUrls: ['heroes.component.css'],
})

export class HeroesComponent implements OnInit {
	heroes: Hero[];
	selectedHero: Hero;
  greeting: Greeting;

	constructor(
		 private router: Router,
		 private heroService: HeroService
	) {}

	getHeroes(): void {
    	this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

  getGreeting(): void {
      this.heroService.getGreeting().then(greeting => this.greeting = greeting);
    }

	ngOnInit(): void {
    	// this.getHeroes();
      this.getGreeting();
    }

	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        });
  }



  // getGreeting(): void {
  //     this.greeting.id = 4;
  //     this.greeting.content = 'Hello World'
  //   }


 }
