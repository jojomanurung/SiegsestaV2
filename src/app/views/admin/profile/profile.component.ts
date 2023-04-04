import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  user!: User;
  displayName: FormControl = new FormControl('');
  editName: boolean = false;
  email: FormControl = new FormControl('', [
    Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    Validators.required,
  ]);
  editEmail: boolean = false;
  messages: any[] = [{ severity: 'error', detail: 'Email Invalid' }];
  photoURL: string = '';

  constructor(private authService: AuthService, private storage: Storage) {
    this.getUser();
  }

  ngOnInit(): void {}

  getUser() {
    this.subs = this.authService.getUser$().subscribe((resp) => {
      console.log('<= Kepanggil berapa kali');
      this.user = resp!;
      this.photoURL = this.user.photoURL ?? '';
      this.email.patchValue(this.user.email);
      this.displayName.patchValue(this.user.displayName);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async uploadImage(event: any) {
    console.log(event);
    if (!event.target.files?.length) return;

    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const name = `${this.user.uid}/${file.name}`;
        const storageRef = ref(this.storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.then(
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              this.subs = this.authService.updatePhotoURL(url).subscribe(() => {
                this.updateUserData();
              });
            });
          },
          (err) => console.log(err)
        );
      }
    }
  }

  updateDisplayName() {
    const dsplayName = this.displayName.value;
    this.subs = this.authService.updateDisplayName(dsplayName).subscribe(() => {
      this.updateUserData();
      this.editName = false;
    });
  }

  updateEmail() {
    const userEmail = this.email.value;
    this.subs = this.authService.updateUserEmail(userEmail).subscribe(() => {
      this.updateUserData();
      this.editEmail = false;
    });
  }

  updateUserData() {
    this.authService.getUser().then((user) => {
      if (user) {
        this.authService.updateUserData(user);
      }
    });
  }
}
