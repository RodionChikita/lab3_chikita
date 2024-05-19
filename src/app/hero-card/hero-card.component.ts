import { Component, Input } from '@angular/core';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  @Input() hero: any;
  isExpanded: boolean = false;

  constructor(private heroService: HeroService) {}

  deleteHero(): void {
    this.heroService.deleteHero(this.hero.id);
  }
}