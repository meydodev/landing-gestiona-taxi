import { Reviews } from './../../../models/reviews';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { HomeService, ReviewStats } from '../../../services/home.service';

@Component({
  selector: 'review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent implements OnInit {
  reviewForm: FormGroup;
  stars = [1, 2, 3, 4, 5];
  hovered = 0;
  reviews: Reviews[] = [];
  stats: ReviewStats | null = null;

  page = 1;
  limit = 9;
  hasMore = true;
  loadingMore = false;
  loading = false;
  serverError = '';

  constructor(private fb: FormBuilder, private reviewsSvc: HomeService) {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.min(1)]],
      review: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.loadPage(true);
    this.getStats();
  }

  setRating(val: number) {
    this.reviewForm.patchValue({ rating: val });
    this.reviewForm.get('rating')!.markAsTouched();
    this.reviewForm.get('rating')!.updateValueAndValidity();
  }

  loadPage(reset = false) {
    if (reset) {
      this.page = 1;
      this.reviews = [];
      this.hasMore = true;
    }
    if (!this.hasMore || this.loadingMore) return;

    this.loadingMore = true;
    this.reviewsSvc.getReviewsPage(this.page, this.limit).subscribe({
      next: (resp) => {
        this.reviews = [...this.reviews, ...resp.items];
        this.hasMore = resp.hasMore;
        this.page += 1;
        this.loadingMore = false;
      },
      error: () => { this.loadingMore = false; }
    });
  }

  onSubmit() {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.serverError = '';

    this.reviewsSvc.addNewReview(this.reviewForm.value as Reviews)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.reviewForm.reset({ rating: 0, review: '' });
          this.hovered = 0;
          this.getStats();        // refrescar stats
          this.loadPage(true);    // recargar página 1
          this.reviewsSvc.triggerRefresh();
        },
        error: (err) => {
          this.serverError = err?.error?.message ?? 'No se pudo enviar la reseña.';
          console.error('Error al guardar la reseña:', err);
        },
      });
  }

  getStats() {
    this.reviewsSvc.getReviewsStats().subscribe({
      next: (s: ReviewStats) => {
        this.stats = s;
        console.log('Estadísticas:', s);
      },
      error: (err) => {
        console.error('Error al obtener estadísticas:', err);
      }
    });
  }
}
