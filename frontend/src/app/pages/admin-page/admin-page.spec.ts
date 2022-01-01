import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminPage } from './admin-page';

describe('AdminPage tests', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AdminPage],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AdminPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tinyURL-admin'`, () => {
    const fixture = TestBed.createComponent(AdminPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tinyURL-admin');
  });

  // TODO
  it('should NOT render title', () => {
    const fixture = TestBed.createComponent(AdminPage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).not.toContain(
      'tinyURL app is running!',
    );
  });
});
