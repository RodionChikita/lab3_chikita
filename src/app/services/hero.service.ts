import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes: any[] = [
    { id: 1, name: 'халк', level: 9, strength: 9, ability: 'сила' },
    { id: 2, name: 'железный человек', level: 2, strength: 5, ability: 'стойкость' }
  ];
  private heroesSubject = new BehaviorSubject<any[]>(this.heroes);

  constructor() {}

  getHeroes() {
    return this.heroesSubject.asObservable();
  }

  addHero(hero: any) {

    const newId = this.heroes.length > 0 ? this.heroes[this.heroes.length - 1].id + 1 : 1;
    const heroWithId = { ...hero, id: newId };
    this.heroes.push(heroWithId);
    this.heroesSubject.next(this.heroes);
  }

  deleteHero(id: number) {
    const index = this.heroes.findIndex(hero => hero.id === id);
    if (index !== -1) {
      this.heroes.splice(index, 1);
      this.heroesSubject.next(this.heroes);
    }
  }
}
