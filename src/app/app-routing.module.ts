import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import { GuestGuard } from './shared/services/guest.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate:[GuestGuard]
  },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
   ,canActivate: [GuestGuard]},
  { path: 'profil', loadChildren: ()=>import('./pages/profile/profile.module').then(m=>m.ProfileModule),
  canActivate:[AuthGuard]
  },
  { path: 'shop-admin', loadChildren: ()=>import('./pages/shop-admin/shop-admin.module').then(m=>m.ShopAdminModule),canActivate:[AuthGuard]},
  { path: 'cart', loadChildren: () => import('./shared/stepper/stepper.module').then(m => m.StepperModule),canActivate:[AuthGuard]},
  { path: 'comments', loadChildren: () => import('./pages/comments/comments.module').then(m => m.CommentsModule),canActivate:[AuthGuard]},
  { path: 'rendelesek', loadChildren: () => import('./pages/rendelesek/rendelesek.module').then(m => m.RendelesekModule),canActivate:[AuthGuard]},
  {path:'**', redirectTo:'/main'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
