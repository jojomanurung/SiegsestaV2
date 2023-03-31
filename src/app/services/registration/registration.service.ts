import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { defer, from, map } from 'rxjs';
import { Pendaftaran } from 'src/app/models/pendaftaran.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  kelasRef = collection(this.fs, 'kelas_perlombaan');
  pendaftaranRef = collection(this.fs, 'pendaftaran');

  constructor(private fs: Firestore) {}

  getPendaftaran(id: string) {
    return defer(() => from(getDoc(doc(this.pendaftaranRef, id)))).pipe(
      map((val) => {
        if (val.exists()) {
          const data = val.data() as Pendaftaran;
          data.id = val.id;
          return data;
        } else {
          throw new Error('Data tidak ditemukan :(');
        }
      })
    );
  }

  updateStatusRegister(id: string) {
    return defer(() =>
      from(updateDoc(doc(this.pendaftaranRef, id), { registered: true }))
    );
  }
}
