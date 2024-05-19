import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  abilities: string[] = ['бегать по стенам', 'летать', 'невидимость', 'телекинез', 'супер прыжок'];
  newAbility: string = '';
  heroForm: FormGroup;
  heroes: any[] = [];
  searchQuery: string = '';
  sortOptions: string[] = ['Уровень (по возрастанию)', 'Уровень (по убыванию)'];
  selectedSortOption: string = 'Уровень (по возрастанию)';
  minLevel: number | null = null;
maxLevel: number | null = null;

  constructor(private fb: FormBuilder, private heroService: HeroService) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ]+$/)]],
      strength: ['', [Validators.required, Validators.min(1), Validators.max(9)]],
      ability: ['', Validators.required],
      level: ['', [Validators.required, Validators.min(1), Validators.max(9)]],
    });
  }

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.sortByLevel();
    });
  }

  save(): void {
    if (this.heroForm.valid) {
      const newHero = this.heroForm.value;
      this.heroService.addHero(newHero);
      this.heroForm.reset();
      this.loadHeroes(); // Обновляем список героев после сохранения
    }
  }

  saveAbility() {
    if (this.newAbility.trim() !== '') {
      this.abilities.push(this.newAbility);
      this.newAbility = '';
    }
  }

  sortByLevel(): void {
    if (this.selectedSortOption === 'Уровень (по возрастанию)') {
      this.heroes.sort((a, b) => a.level - b.level);
    } else if (this.selectedSortOption === 'Уровень (по убыванию)') {
      this.heroes.sort((a, b) => b.level - a.level);
    }
  }

  filterByAbility(event: any): void {
    const ability = event ? event.value : null;
    if (ability) {
      this.heroService.getHeroes().subscribe(heroes => {
        this.heroes = heroes.filter(hero => hero.ability === ability);
      });
    }
  }

  searchByName(): void {
    if (this.searchQuery.length >= 2) {
      this.heroService.getHeroes().subscribe(heroes => {
        this.heroes = heroes.filter(hero => hero.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      });
    }
  }


  filterByLevelRange(): void {
    if (this.minLevel !== null && this.maxLevel !== null && this.minLevel <= this.maxLevel) {
      this.heroService.getHeroes().subscribe(heroes => {
        this.heroes = heroes.filter(hero => hero.level >= this.minLevel! && hero.level <= this.maxLevel!);
      });
    }
  }
}
