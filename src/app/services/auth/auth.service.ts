import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { defer, forkJoin, from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Firestore, doc, docSnapshots, setDoc } from '@angular/fire/firestore';
import {
  applyActionCode,
  Auth,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
} from '@angular/fire/auth';
import { User } from 'src/app/models/user.model';
import { FirebaseError } from '@angular/fire/app';

export function isAngularFireError(err: any): err is FirebaseError {
  return err.name && err.name === 'FirebaseError';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private firestore: Firestore,
    private router: Router,
    private fireAuth: Auth
  ) {}

  /**
   * Get current user data
   * @note Use this if you need user data once
   * @returns Promise User
   */
  getUser() {
    return new Promise<User | null>((resolve) => {
      onAuthStateChanged(this.fireAuth, (user) => {
        if (user) {
          resolve(new User(user));
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Get current user data from collection.
   * @note Use this if you want to listen every user state
   * @returns Observable User
   */
  getUser$() {
    // return new Observable<User | null>((subs) => {
    //   onAuthStateChanged(this.fireAuth, (user) => {
    //     if (user) {
          const userRef = doc(this.firestore, `users/${this.fireAuth.currentUser?.uid}`);
          const user$ = docSnapshots(userRef);
          return user$
            .pipe(map((val) => val.data() as User))
            // .subscribe((al) => {
            //   subs.next(al);
            //   unsubs.unsubscribe();
            //   subs.complete();
            // });
        // } else {
        //   subs.next(null);
        // }
    //   });
    // });
  }

  verifyEmail(actionCode: string) {
    return applyActionCode(this.fireAuth, actionCode);
  }

  sendPasswordReset(email: string) {
    return sendPasswordResetEmail(this.fireAuth, email);
  }

  confirmResetPassword(code: string, newPassword: string) {
    return confirmPasswordReset(this.fireAuth, code, newPassword);
  }

  emailSignUp(email: string, password: string) {
    const credential = from(
      createUserWithEmailAndPassword(this.fireAuth, email, password)
    );
    return credential.pipe(
      concatMap((val) =>
        forkJoin({
          update: defer(() => from(this.updateUserData(val.user))),
          send: defer(() => from(sendEmailVerification(val.user))),
        })
      )
    );
  }

  emailSignIn(email: string, password: string) {
    const credential = from(
      signInWithEmailAndPassword(this.fireAuth, email, password)
    );
    return credential.pipe(
      concatMap((val) => defer(() => from(this.updateUserData(val.user))))
    );
  }

  /**
   * Sets user data to firestore on login
   */
  updateUserData(user: User) {
    const userRef = doc(this.firestore, `users/${user.uid}`);

    const data: User = new User(user);

    return setDoc(userRef, Object.assign({}, data), { merge: true });
  }

  /**
   * Update user photoURL firebase
   */
  updatePhotoURL(url: string) {
    return defer(() =>
      from(
        updateProfile(this.fireAuth.currentUser!, {
          photoURL: url,
        })
      )
    );
  }

  /**
   * Update User display name firebase
   */
  updateDisplayName(name: string) {
    return defer(() =>
      from(
        updateProfile(this.fireAuth.currentUser!, {
          displayName: name,
        })
      )
    );
  }

  /**
   * Update user email firebase
   */
  updateUserEmail(email: string) {
    return defer(() => from(updateEmail(this.fireAuth.currentUser!, email)));
  }

  async logOut() {
    await signOut(this.fireAuth);
    this.router.navigate(['/login']);
  }
}
