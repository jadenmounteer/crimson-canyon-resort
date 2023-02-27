import { Component, Input } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Input() isAuth: boolean = false;

  protected isMenuCollapsed: boolean = true;

  constructor(public icon: IconService, public authService: AuthService) {}
}
