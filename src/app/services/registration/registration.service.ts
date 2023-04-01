import { Injectable } from '@angular/core';
import {
  collection,
  collectionSnapshots,
  doc,
  Firestore,
  getCountFromServer,
  getDoc,
  limit,
  orderBy,
  OrderByDirection,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { defer, from, map } from 'rxjs';
import { Pendaftaran } from 'src/app/models/pendaftaran.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  kelasRef = collection(this.fs, 'kelas_perlombaan');
  pendaftaranRef = collection(this.fs, 'pendaftaran');
  usersRef = collection(this.fs, 'users');

  constructor(private fs: Firestore) {}

  //******* Query Firestore ******//

  getCountPendaftaran() {
    return defer(() => from(getCountFromServer(this.pendaftaranRef)));
  }

  getAllPendaftaran(
    order?: [{ name: string; state: OrderByDirection }],
    limitSize?: number
  ) {
    const sortBy = order?.map(({ name, state }) => {
      return orderBy(name, state);
    });
    if (sortBy?.length && limitSize) {
      const sortQuery = query(this.pendaftaranRef, ...sortBy, limit(limitSize));
      return collectionSnapshots(sortQuery).pipe(
        map((docs) => {
          return docs.map((doc) => {
            const data = doc.data() as any;
            data.id = doc.id;
            return data;
          });
        })
      );
    } else {
      return collectionSnapshots(this.pendaftaranRef).pipe(
        map((docs) => {
          return docs.map((doc) => {
            const data = doc.data() as any;
            data.id = doc.id;
            return data;
          });
        })
      );
    }
  }

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

  getCountRegistered() {
    const filter = query(this.pendaftaranRef, where('registered', '==', true));
    return defer(() => from(getCountFromServer(filter)));
  }

  getAllRegistered() {
    const filter = query(this.pendaftaranRef, where('registered', '==', true));
    return collectionSnapshots(filter).pipe(
      map((docs) => {
        return docs.map((doc) => {
          const data = doc.data() as any;
          data.id = doc.id;
          return data;
        });
      })
    );
  }

  getCountKelas() {
    return defer(() => from(getCountFromServer(this.kelasRef)));
  }

  getCountUser() {
    return defer(() => from(getCountFromServer(this.usersRef)));
  }

  //****** Mutation Firebase ******//

  updateStatusRegister(id: string) {
    return defer(() =>
      from(updateDoc(doc(this.pendaftaranRef, id), { registered: true }))
    );
  }
}
