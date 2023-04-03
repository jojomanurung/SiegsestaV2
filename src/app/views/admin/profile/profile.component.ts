import { Component, OnDestroy, OnInit } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
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

  constructor(private authService: AuthService, private storage: Storage) {}

  ngOnInit(): void {
    this.subs = this.authService.getUser$().subscribe((resp) => {
      this.user = resp!;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  uploadImage(event: any) {
    console.log(event);
    if (!event.files?.length) return;

    const files: FileList = event.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const name = `${this.user.uid}/${file.name}`;
        const storageRef = ref(this.storage, name);
        uploadBytesResumable(storageRef, file);
      }
    }
  }
}
