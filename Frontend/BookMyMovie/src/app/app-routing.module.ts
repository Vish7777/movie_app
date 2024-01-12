// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { RegistrationComponent } from './register/register.component';
import { MoviesComponent } from './movies/movies.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AuthGuard } from './authentication/AuthGuard';
import { HeadersComponent } from './headers/headers.component';


const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'header', component: HeadersComponent },

 
  { path: 'user/login', component: UserloginComponent },
  { path: 'admin/login', component: AdminloginComponent },
  { path: 'user/register', component: RegistrationComponent },
  { path: 'user/movies', component: MoviesComponent, canActivate: [AuthGuard] },
  // { path: 'user/profiles', component: UserprofilesComponent, canActivate: [AuthGuard] },
  { path: 'user/wishlist', component: WishlistComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
