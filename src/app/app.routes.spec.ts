import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('App routes', () => {
  it('should navigate to home route by default', waitForAsync(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideLocationMocks()],
    });
    const harness = await RouterTestingHarness.create('');
    const p: HTMLParagraphElement = harness.fixture.debugElement.query(
      By.css('p')
    ).nativeElement;
    expect(p.textContent).toBe('home works!');
  }));

  it('should navigate to product route', waitForAsync(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideLocationMocks(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    const harness = await RouterTestingHarness.create('/products');

    const p: HTMLButtonElement = harness.fixture.debugElement.query(
      By.css('p')
    ).nativeElement;
    expect(p.textContent).toBe('Product works');
  }));
});
