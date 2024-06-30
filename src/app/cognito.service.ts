import { Injectable } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { signIn, type SignInInput, signOut } from 'aws-amplify/auth';
import { environment } from '../environments/environment';
import { getCurrentUser } from 'aws-amplify/auth';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: {
          signUpVerificationMethod: 'code',
          loginWith: {
            username: true,
            email: true,
          },
          ...environment.cognito,
        },
      },
    });
  }

  signIn({ username, password }: SignInInput): Promise<any> {
    return new Promise((resolve, reject) => {
      signIn({ username, password })
        .then((result) => {
          resolve(result);
        })
        .catch((e) => reject(e));
    });
  }

  signOut(): Promise<any> {
    const userPool: CognitoUserPool = new CognitoUserPool({
      ClientId: environment.cognito.userPoolClientId,
      UserPoolId: environment.cognito.userPoolId,
    });

    return new Promise((resolve, reject): void => {
      const cognitoUser: CognitoUser | null = userPool.getCurrentUser();
      console.log('cognito user', cognitoUser);
      if (cognitoUser) {
        cognitoUser.getSession((err: Error) => {
          console.log('err in cognito user session', err);
          if (err) {
            reject(err);
          }
        });
        cognitoUser.globalSignOut({
          onFailure: reject,
          onSuccess: resolve,
        });
      } else {
        resolve('user not logged in or session expired');
      }
    });
  }

  async globalSignout() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
