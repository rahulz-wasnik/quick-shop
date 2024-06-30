import { Injectable, signal, effect } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from '../environments/environment';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { AUTHENTICATION } from './authentication-enum';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  static readonly BEARER: string = 'bearer';

  authenticationStatus = signal<AUTHENTICATION | undefined>(undefined);

  postLogInAndLogOutEffect = effect(() => {
    if (this.authenticationStatus() == AUTHENTICATION.LOGIN_SUCCESS) {
      Auth.currentSession().then((session) => {
        localStorage.setItem(
          CognitoService.BEARER,
          session.getIdToken().getJwtToken()
        );
      });
    } else if (this.authenticationStatus() == AUTHENTICATION.LOGOUT_SUCCESS) {
      localStorage.removeItem(CognitoService.BEARER);
    }
  });

  constructor() {
    Amplify.configure({
      Auth: {
        region: 'ap-south-1',
        userPoolId: environment.userPoolId,
        userPoolWebClientId: environment.userPoolWebClientId,
        localStorage: window.localStorage,
      },
    });
  }

  signIn(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Auth.signIn({ username, password })
        .then((result) => {
          this.authenticationStatus.set(AUTHENTICATION.LOGIN_SUCCESS);
          resolve(result);
        })
        .catch((e) => reject(e));
    });
  }

  signOut(): Promise<any> {
    const userPool: CognitoUserPool = new CognitoUserPool({
      ClientId: environment.userPoolWebClientId,
      UserPoolId: environment.userPoolId,
    });

    return new Promise((resolve, reject): void => {
      const cognitoUser: CognitoUser | null = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err: Error) => {
          if (err) {
            reject(err);
          }
        });
        cognitoUser.globalSignOut({
          onFailure: reject,
          onSuccess: () => {
            this.authenticationStatus.set(AUTHENTICATION.LOGOUT_SUCCESS);
            resolve('Logged out');
          },
        });
      } else {
        resolve('User not logged in or session expired');
      }
    });
  }

  async globalSignout() {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
