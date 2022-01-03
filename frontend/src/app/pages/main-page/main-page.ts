import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { TinyUrlService } from 'src/app/services/tiny-url.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.html',
})
export class MainPage {
  saving = false;
  @Input() longUrl = '';
  shortUrl = '';

  constructor(
    private tinyUrlService: TinyUrlService,
    // private snackBarService: MatSnackBar,
    private clipboard: Clipboard,
  ) {}

  async shortenUrl() {
    try {
      this.saving = true;
      const response = await this.tinyUrlService.shortenUrl(this.longUrl);
      const shortUrl = response.shortUrl;
      if (typeof shortUrl !== 'string') {
        throw Error(`Expected shortUrl to be a string, got ${typeof shortUrl}`);
      }
      this.shortUrl = 'http://localhost:1212/' + shortUrl; // TODO: env
    } catch (err) {
      alert('Failed to create short url!');
      // TODO: Better error display
    } finally {
      this.saving = false;
    }
  }

  copyToClipboard() {
    if (!this.shortUrl) {
      return;
    }
    this.clipboard.copy(this.shortUrl);
    // this.snackBarService.open(`Copied ${this.shortUrl} link to clipboard!`);
  }

  btnDisabled() {
    return this.saving || !this.tinyUrlService.isUrlValid(this.longUrl);
  }
}
