import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthenticationResult} from "@azure/msal-browser";
import {MsalService} from "@azure/msal-angular";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'front-duoc-azure';

  constructor(private msalService: MsalService) {}



  usuarioEstaConectado(): boolean {
    return this.msalService.instance.getActiveAccount() !== null;
  }



  iniciarSesion(): void {
    this.msalService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);

        this.msalService.acquireTokenSilent({ scopes: [] }).subscribe({
          next: (tokenResponse) => {
            localStorage.setItem('jwt', tokenResponse.idToken);
          }
        });
      });
  }

  cerrarSesion(): void {
    this.msalService.logout();
    console.log('User logged out');
  }

}
