import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DownloadCounter } from '../../../models/downlodas'; // 👈 corregido
import { CommonModule } from '@angular/common';
import { HomeService, ReviewStats } from '../../../services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'] // 👈 corregido
})
export class HeroComponent implements OnInit {
  isMenuOpen = false;
  counterDownload: number = 0;
  isLoadingStats = false;
  isLoadingDownload = false;
  stats: ReviewStats | null = null;

  constructor(private store: Store, private homeSvc: HomeService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadCounterDownload();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  addCounterDownloadApk(): void {
    this.isLoadingDownload = true;
    this.homeSvc.addDownloadCounter().subscribe({
      next: (s: DownloadCounter) => {
        this.counterDownload = s.counterDownload;
        this.isLoadingDownload = false; // ✅ se apaga loader
        Swal.fire({
          title: "Importante",
          text: "Activa 'Orígenes desconocidos' para instalar y vuelve a desactivar después por seguridad.",
          icon: "success",
          confirmButtonColor: '#f59e0b'
        });
      },
      error: (err) => {
        this.isLoadingDownload = false;
        console.error('Error al incrementar el contador de descargas', err);
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar el contador de descargas.",
          icon: "error",
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  loadCounterDownload(): void {
    this.homeSvc.getDownloadsCounter().subscribe({
      next: (s: DownloadCounter) => {
        this.counterDownload = s.counterDownload;
      },
      error: (err) => console.error('Error al cargar el contador de descargas', err)
    });
  }

  loadStats(): void {
    this.isLoadingStats = true;
    this.homeSvc.getReviewsStats().subscribe({
      next: (s) => {
        this.stats = s;
        this.isLoadingStats = false;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas', err);
        this.isLoadingStats = false;
      }
    });
  }
}
