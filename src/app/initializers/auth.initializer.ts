import { AuthService } from 'src/app/services/auth.service';

export const authInitializer = (auth: AuthService) => async () => {
  const isSessionAlive = await auth.isSessionAlive();

  if (!isSessionAlive) {
    auth.login();
  }
};
