import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './components/auth/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgIf } from '@angular/common';
import { CheckAvailabilityMenu } from './components/CheckAvailabilityMenu/check-availability-menu.component';
import { ReserveTripPageComponent } from './components/reserve-trip-page/reserve-trip-page.component';
import { PageNotFoundPageComponent } from './components/page-not-found-page/page-not-found-page.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { MyReservationsPageComponent } from './components/my-reservations-page/my-reservations-page.component';
import { ReservationBookedPageComponent } from './components/reservation-booked-page/reservation-booked-page.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { LoginOrSignUpComponent } from './components/auth/login/login-or-sign-up.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { AdministrationModule } from './administration/administration.module';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { RequestToCreateAccountPageComponent } from './components/request-to-create-account-page/request-to-create-account-page.component';
import { AnnouncementsSectionComponent } from './components/whats-happening-section/announcments-section.component';
import { InstagramFeedComponent } from './components/instagram-feed/instagram-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginOrSignUpComponent,
    NavComponent,
    HomePageComponent,
    CarouselComponent,
    CheckAvailabilityMenu,
    ReserveTripPageComponent,
    PageNotFoundPageComponent,
    WeatherComponent,
    MyReservationsPageComponent,
    ReservationBookedPageComponent,
    ReservationDetailsComponent,
    ConfirmModalComponent,
    LoginPageComponent,
    SignUpPageComponent,
    RequestToCreateAccountPageComponent,
    AnnouncementsSectionComponent,
    InstagramFeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    NgbCarouselModule,
    NgIf,
    HttpClientModule,
    AdministrationModule,
    UiComponentsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
