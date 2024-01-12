import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersComponent } from './headers/headers.component';
import { HomeComponent } from './home/home.component';


import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { RegistrationComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserloginComponent } from './userlogin/userlogin.component';
import { MoviesComponent } from './movies/movies.component';
import { UserprofilesComponent } from './userprofiles/userprofiles.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NotfoundComponent } from './notfound/notfound.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSpinnerModule } from 'ngx-spinner';







@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    HomeComponent,
    AdminloginComponent,
    RegistrationComponent,
    UserloginComponent,
    MoviesComponent,
    UserprofilesComponent,
    MoviedetailsComponent,
    WishlistComponent,
    NotfoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    CarouselModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxSpinnerModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
