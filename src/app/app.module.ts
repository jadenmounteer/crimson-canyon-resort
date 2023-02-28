import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './components/auth/auth.service';
import { AnimationComponent } from './components/animation/animation.component';
import { LottieModule } from 'ngx-lottie';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { GoogleButtonComponent } from './components/google-button/google-button.component';
import { NavComponent } from './components/nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgIf } from '@angular/common';
import { CheckAvailabilityMenu } from './components/CheckAvailabilityMenu/check-availability-menu.component';
import { ReserveTripPageComponent } from './components/reserve-trip-page/reserve-trip-page.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageNotFoundPageComponent } from './components/page-not-found-page/page-not-found-page.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';

// TODO This is a function necessary for lottie (is there a better place for this?)
export function playerFactory(): any {
  return import('lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
    AnimationComponent,
    LoginComponent,
    SignupComponent,
    GoogleButtonComponent,
    NavComponent,
    HomePageComponent,
    CarouselComponent,
    CheckAvailabilityMenu,
    ReserveTripPageComponent,
    PageWrapperComponent,
    LoadingSpinnerComponent,
    PageNotFoundPageComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    LottieModule.forRoot({ player: playerFactory }),
    FormsModule,
    FontAwesomeModule,
    NgbCarouselModule,
    NgIf,
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
