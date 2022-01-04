import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TinyUrlService } from 'src/app/services/tiny-url.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.html',
  styles: [
    `
      .mat-cell {
        padding: 1rem 1rem 1rem 0;
      }
    `,
  ],
})
export class AdminPage {
  title = 'tinyURL-admin';
  urlObjects: any[] = [];
  displayedColumns = ['position', 'longUrl', 'shortUrl', 'timesUsed'];

  constructor(
    private tinyUrlService: TinyUrlService,
    private snackBarService: MatSnackBar,
  ) {}

  async ngOnInit() {
    try {
      this.urlObjects = (await this.tinyUrlService.getAnalytics()).map(
        (obj, idx) => ({ ...obj, position: idx + 1 }),
      );
    } catch (err) {
      alert('Failed to fetch most used url-s');
      console.log(err);
    }
  }
}
