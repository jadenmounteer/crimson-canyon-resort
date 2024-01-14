import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbCarouselModule,
  NgbModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './components/auth/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgIf } from '@angular/common';
import { CheckAvailabilityMenuComponent } from './components/CheckAvailabilityMenu/check-availability-menu.component';
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
import { InstagramFeedComponent } from './components/instagram-feed/instagram-feed.component';
import { WhatsHappeningHomePageSectionComponent } from './components/whats-happening-home-page-section/whats-happening-home-page-section.component';
import { WhatsHappeningPageModule } from './whats-happening-page/whats-happening-page.module';
import { AnnouncementsSectionComponent } from './components/announcements-section/announcments-section.component';
import { InstagramFeedModule } from './components/instagram-feed/instagram-feed.module';
import { FitnessCenterModule } from './fitness-center/fitness-center.module';
import { FitnessHomePageSectionComponent } from './components/fitness-home-page-section/fitness-home-page-section.component';
import { DayTemplateComponent } from './components/day-template/day-template.component';
import { NavWeatherComponent } from './components/weather/nav-weather/nav-weather.component';
import { ReviewsSectionComponent } from './components/reviews-section/reviews-section.component';
import { ReviewComponent } from './components/review/review.component';
import { AddReviewModalComponent } from './components/add-review-modal/add-review-modal.component';
import { CommentsAreaComponent } from './ui-components/comments-area/comments-area.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AdminSectionComponent } from './components/admin-section/admin-section.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginOrSignUpComponent,
    NavComponent,
    HomePageComponent,
    CarouselComponent,
    CheckAvailabilityMenuComponent,
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
    WhatsHappeningHomePageSectionComponent,
    FitnessHomePageSectionComponent,
    DayTemplateComponent,
    NavWeatherComponent,
    ReviewsSectionComponent,
    ReviewComponent,
    AddReviewModalComponent,
    AdminSectionComponent,
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
    WhatsHappeningPageModule,
    InstagramFeedModule,
    FitnessCenterModule,
    NgbRatingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
