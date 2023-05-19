import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent {
  constructor(private readonly auth: AuthService) {}

  readonly isLoggedIn$: Observable<boolean> = this.auth.authChange$.pipe(
    map((sid) => sid.length > 0)
  );
}
