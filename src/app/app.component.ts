import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CognitoService } from './cognito.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private cognitoService: CognitoService = inject(CognitoService);
  private productService: ProductService = inject(ProductService);

  login(): void {
    this.cognitoService
      .signIn('rahul@qs.com', 'Quickshop@12')
      .then((response) => {
        console.log(response);
      });
  }

  logout(): void {
    this.cognitoService.signOut().then((res) => console.log(res));
  }

  globalLogout(): void {
    this.cognitoService.globalSignout().then((res) => console.log(res));
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((res) => console.log(res));
  }
}
