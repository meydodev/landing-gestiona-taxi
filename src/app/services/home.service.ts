
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DownloadCounter } from '../models/downlodas';
import { Reviews } from '../models/reviews';
import { Subject } from 'rxjs';



export interface ReviewStats {
  average: number;
  total: number;
  breakdown: { [stars: number]: number };
}
// home.service.ts




@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

   private _refresh$ = new Subject<void>();
  refresh$ = this._refresh$.asObservable();

  triggerRefresh() { this._refresh$.next(); }


  getDownloadsCounter(): Observable<DownloadCounter> {
    return this.http.get<DownloadCounter>(`${environment.apiUrl}/api/downloadsCounter`);
  }

  addDownloadCounter(): Observable<DownloadCounter> {
    return this.http.post<DownloadCounter>(`${environment.apiUrl}/api/downloadsCounter`, {});
  }

  getReviews(): Observable<Reviews[]> {
    return this.http.get<Reviews[]>(`${environment.apiUrl}/api/reviews`);
  }

  addNewReview(payload: Reviews): Observable<Reviews> {
    return this.http.post<Reviews>(`${environment.apiUrl}/api/reviews`, payload);
  }

  // home.service.ts
 getReviewsPage(page = 1, limit = 9): Observable<{
    items: Reviews[];
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  }> {
    return this.http.get<{
      items: Reviews[];
      page: number;
      limit: number;
      total: number;
      hasMore: boolean;
    }>(`${environment.apiUrl}/api/reviews`, { params: { page, limit } as any });
  }

  getReviewsStats(): Observable<ReviewStats> {
    return this.http.get<ReviewStats>(`${environment.apiUrl}/api/reviews/stats`);
  }
}
