import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockProducts } from '../../shared/mock-test-data';
import { ProductListingComponent } from './product-listings.component';
import { By } from '@angular/platform-browser';

describe('ProductListingComponent', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
  });

  it('should display a list of products', () => {
    // ARRANGE
    fixture.componentRef.setInput('products', mockProducts);

    // ACT
    fixture.detectChanges();

    // ASSERT
    const rows = fixture.debugElement.queryAll(By.css('button'));
    expect(rows).toHaveSize(1);
  });
});
