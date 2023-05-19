import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './auth-state.component.html',
  styleUrls: ['./auth-state.component.css'],
})
export class AuthStateComponent {
  constructor(private readonly auth: AuthService) {}

  readonly authStatus$ = this.auth.authChange$.pipe(
    map((sid) => ({ isLoggedIn: sid.length > 0, sid }))
  );
}
