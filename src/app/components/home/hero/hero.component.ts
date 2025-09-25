import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCounter, incrementCounter } from '../../../store/downloadsCounter.actions';
import { selectCounterValue, selectLoading } from '../../../store/downloadsCounter.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HomeService, ReviewStats } from '../../../services/home.service';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  counter$: Observable<number> = this.store.select(selectCounterValue);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  isMenuOpen = false;

  stats: ReviewStats | null = null;

  constructor(private store: Store, private homeSvc: HomeService) {}

  ngOnInit(): void {
    this.store.dispatch(loadCounter());
    this.loadStats();
    this.homeSvc.refresh$.subscribe(() => this.loadStats());
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  addCounterDownloadApk(): void {
    this.store.dispatch(incrementCounter());
  }

  loadStats(): void {
    this.homeSvc.getReviewsStats().subscribe({
      next: (s) => this.stats = s,
      error: (err) => console.error('Error al cargar estadísticas', err)
    });
  }
}
