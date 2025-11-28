import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Dashboard } from './components/dashboard/dashboard';
import { Inventario } from './components/inventario/inventario';
import { Inventarioinsertar } from './components/inventario/inventarioinsertar/inventarioinsertar';
import { inventariolistar } from './components/inventario/inventariolistar/inventariolistar';
import { Productolistar } from './components/producto/productolistar/productolistar';
import { Productoinsertar } from './components/producto/productoinsertar/productoinsertar';
import { Recetalistar } from './components/receta/recetalistar/recetalistar';
import { Recetainsertar } from './components/receta/recetainsertar/recetainsertar';
import { Notificacionlistar } from './components/notificacion/notificacionlistar/notificacionlistar';
import { Notificacioninsertar } from './components/notificacion/notificacioninsertar/notificacioninsertar';
import { Usuariolistar } from './components/usuario/usuariolistar/usuariolistar';
import { Usuarioinsertar } from './components/usuario/usuarioinsertar/usuarioinsertar';
import { Rollistar } from './components/rol/rollistar/rollistar';
import { Rolinsertar } from './components/rol/rolinsertar/rolinsertar';
import { Calificacionrecetalistar } from './components/calificacionreceta/calificacionrecetalistar/calificacionrecetalistar';
import { Calificacionrecetainsertar } from './components/calificacionreceta/calificacionrecetainsertar/calificacionrecetainsertar';
import { Ingredienterecetalistar } from './components/ingredientereceta/ingredienterecetalistar/ingredienterecetalistar';
import { Ingredienterecetainsertar } from './components/ingredientereceta/ingredienterecetainsertar/ingredienterecetainsertar';
import { Producto } from './components/producto/producto';
import { Receta } from './components/receta/receta';
import { Notificacion } from './components/notificacion/notificacion';
import { Usuario } from './components/usuario/usuario';
import { Rol } from './components/rol/rol';
import { Calificacionreceta } from './components/calificacionreceta/calificacionreceta';
import { Ingredientereceta } from './components/ingredientereceta/ingredientereceta';
import { Escaneo } from './components/escaneo/escaneo';
import { Escaneolistar } from './components/escaneo/escaneolistar/escaneolistar';
import { Escaneoinsertar } from './components/escaneo/escaneoinsertar/escaneoinsertar';
import { seguridadGuard } from './guard/seguridad-guard';
import { Autenticador } from './components/autenticador/autenticador';
import { Ia } from './components/ia/ia';

export const routes: Routes = [
  { path: '', component: Landing }, // ← Landing page
  { path: 'login', component: Autenticador },

  // Ruta pública para registrarse
  { path: 'registro', component: Usuarioinsertar },

  { path: 'dashboard', component: Dashboard, canActivate: [seguridadGuard] }, // ← Dashboard page

  {
    path: 'inventario',
    component: Inventario,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: inventariolistar },
      { path: 'nuevos', component: Inventarioinsertar },
      { path: 'edits/:id', component: Inventarioinsertar },
    ],
  },
  {
    path: 'producto',
    component: Producto,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Productolistar },
      { path: 'nuevos', component: Productoinsertar },
      { path: 'edits/:id', component: Productoinsertar },
    ],
  },
  {
    path: 'receta',
    component: Receta,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Recetalistar },
      { path: 'nuevos', component: Recetainsertar },
      { path: 'edits/:id', component: Recetainsertar },
    ],
  },
  {
    path: 'notificacion',
    component: Notificacion,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Notificacionlistar },
      { path: 'nuevos', component: Notificacioninsertar },
    ],
  },
  {
    path: 'usuario',
    component: Usuario,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Usuariolistar },
      { path: 'edits/:id', component: Usuarioinsertar },
    ],
  },
  {
    path: 'rol',
    component: Rol,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Rollistar },
      { path: 'nuevos', component: Rolinsertar },
      { path: 'edits/:id', component: Rolinsertar },
    ],
  },
  {
    path: 'calificacion',
    component: Calificacionreceta,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Calificacionrecetalistar },
      { path: 'nuevos', component: Calificacionrecetainsertar },
    ],
  },
  {
    path: 'ingrediente',
    component: Ingredientereceta,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Ingredienterecetalistar },
      { path: 'nuevos', component: Ingredienterecetainsertar },
    ],
  },
  {
    path: 'escaneo',
    component: Escaneo,
    canActivate: [seguridadGuard],
    children: [
      { path: 'listas', component: Escaneolistar },
      { path: 'nuevos', component: Escaneoinsertar },
    ],
  },
  // IA (DeepSeek API)
  { path: 'ia', component: Ia, canActivate: [seguridadGuard] },
];
