import { Component, OnDestroy, OnInit } from '@angular/core';
import { ref, uploadBytesResumable } from '@angular/fire/storage';
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
  // private readonly storage: Storage = inject(Storage);

  constructor(private authService: AuthService) {}

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
    // if (!event.files?.length) return;

    // const files: FileList = event.files;

    // for (let i = 0; i < files.length; i++) {
    //   const file = files.item(i);
    //   if (file) {
    //     const storageRef = ref(this.storage, file.name);
    //     uploadBytesResumable(storageRef, file);
    //   }
    // }
  }
}
