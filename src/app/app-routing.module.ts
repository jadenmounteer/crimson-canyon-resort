import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { LoginOrSignUpComponent } from './components/auth/login/login-or-sign-up.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MyReservationsPageComponent } from './components/my-reservations-page/my-reservations-page.component';
import { PageNotFoundPageComponent } from './components/page-not-found-page/page-not-found-page.component';
import { ReservationBookedPageComponent } from './components/reservation-booked-page/reservation-booked-page.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { ReserveTripPageComponent } from './components/reserve-trip-page/reserve-trip-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login-or-sign-up/:newUser',
    component: LoginOrSignUpComponent,
  },
  {
    path: 'reserve-trip-page',
    component: ReserveTripPageComponent,
  },
  {
    path: 'my-reservations-page',
    component: MyReservationsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reservation-booked-page',
    component: ReservationBookedPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reservation-details-page/:id',
    component: ReservationDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'page-not-found-page',
    component: PageNotFoundPageComponent,
  },
  // {
  //   path: 'exercise-library',
  //   component: ExerciseLibraryComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'coming-soon',
  //   component: FeatureComingSoonComponent,
  //   canActivate: [AuthGuard],
  // },
  // This is the wildcard route. It must always be last.
  {
    path: '**',
    component: PageNotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
