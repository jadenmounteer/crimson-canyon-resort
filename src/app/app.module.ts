import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
