import { Routes } from '@angular/router';
import { PaginaPublicaComponent } from './pagina-publica/pagina-publica.component';
import { PaginaPrivadaComponent } from './pagina-privada/pagina-privada.component';
import {MsalGuard} from "./guard/msal.guard";


export const routes: Routes = [
  { path: 'pagina-publica', component: PaginaPublicaComponent },
  { path: 'pagina-privada', component: PaginaPrivadaComponent, canActivate: [MsalGuard] },
  { path: '**', component: PaginaPublicaComponent },
];
