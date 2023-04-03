export class User {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  emailVerified: boolean;
  isAnonymous: boolean;

  constructor(input: User) {
    this.uid = input.uid;
    this.displayName = input.displayName;
    this.email = input.email;
    this.phoneNumber = input.phoneNumber;
    this.photoURL = input.photoURL;
    this.providerId = input.providerId;
    this.emailVerified = input.emailVerified;
    this.isAnonymous = input.isAnonymous;
  }
}
