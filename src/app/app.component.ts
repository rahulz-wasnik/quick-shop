import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CognitoService } from './cognito.service';
import { ContentProjectionParentComponent } from './content-projection/content-projection-parent/content-projection-parent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ContentProjectionParentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private cognitoService: CognitoService = inject(CognitoService);

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

  getProducts(): void {}
}
