import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundPageComponent } from './components/page-not-found-page/page-not-found-page.component';
import { ReserveTripPageComponent } from './components/reserve-trip-page/reserve-trip-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'reserve-trip-page',
    component: ReserveTripPageComponent,
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
})
export class AppRoutingModule {}
