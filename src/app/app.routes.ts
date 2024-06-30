import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'gestionar-pedidos',
      },
      {
        path: 'crud-clientes',
        pathMatch: 'full',
        loadComponent: () =>
          import('./home/crud-clientes/crud-clientes.component').then(
            (m) => m.CrudClientesComponent
          ),
      },
      {
        path: 'crud-libros',
        pathMatch: 'full',
        loadComponent: () =>
          import('./home/crud-libros/crud-libros.component').then(
            (m) => m.CrudLibrosComponent
          ),
      },
      {
        path: 'gestionar-pedidos',
        pathMatch: 'full',
        loadComponent: () =>
          import('./home/gestionar-pedidos/gestionar-pedidos.component').then(
            (m) => m.GestionarPedidosComponent
          ),
      },
    ]
  },
];
