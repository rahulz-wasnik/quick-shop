import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CognitoService } from './cognito.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private cognitoService: CognitoService) {}

  login(): void {
    this.cognitoService
      .signIn({ username: 'rahul@qs.com', password: 'Quickshop@12' })
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
}
