import { Component, OnInit } from '@angular/core';

import { Hero } from '../entities/hero.interface';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'level', 'strength', 'ability', 'delete'];
  public dataSource: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.dataSource = heroes;
    });
  }

  public delete(index: number): void {
    if (index !== -1) {
      const newData = this.dataSource.slice();
      newData.splice(index, 1);
      this.dataSource = newData;
    }
  }
}
