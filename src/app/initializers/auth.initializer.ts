import { AuthService } from 'src/services/auth.service';

export const authInitializer = (auth: AuthService) => async () => {
  const isSessionAlive = await auth.isSessionAlive();

  if (!isSessionAlive) {
    auth.login();
  }
};
