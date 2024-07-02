import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from '../environments/environment';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
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
        .then((result) => resolve(result))
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
          onSuccess: () => resolve('Logged out'),
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
