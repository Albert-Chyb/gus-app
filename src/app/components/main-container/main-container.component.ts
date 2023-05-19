import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  readonly isLoggedIn$: Observable<boolean> = this.auth.authChange$.pipe(
    map((sid) => sid.length > 0)
  );

  async login() {
    await this.auth.login();
    await this.router.navigate(['/']);
  }

  async logout() {
    this.auth.logout();
    
    await this.router.navigate(['/auth-state']);
  }
}
