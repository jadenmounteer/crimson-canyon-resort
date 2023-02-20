import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './components/auth/auth.service';
import { AnimationComponent } from './components/animation/animation.component';

@NgModule({
  declarations: [AppComponent, AnimationComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
