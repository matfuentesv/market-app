import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';
import {DefaultBackendService} from "../core/services/default-backend.service";
import {JsonPipe} from "@angular/common";


@Component({
  selector: 'app-pagina-privada',
  standalone: true,
  templateUrl: './pagina-privada.component.html',
  imports: [
    JsonPipe
  ],
  styleUrls: ['./pagina-privada.component.css']
})
export class PaginaPrivadaComponent implements OnInit {

  responseBackend: object | undefined;

  constructor(private authService: MsalService) { }

  ngOnInit(): void {
  }

  obtenerUsuario(): string {
    if (this.authService.instance.getActiveAccount() == null) {
      return 'error';
    }
    // @ts-ignore
    return this.authService.instance.getActiveAccount().name;
  }

  llamarBackend(): void {
    // this.backendService.consumirBackend().subscribe(response => {
    //   this.responseBackend = response;
    // });
  }

  mostrarResponseBackend(): string {
    return JSON.stringify(this.responseBackend);
  }
}
