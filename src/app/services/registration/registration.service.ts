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
    order?: { name: string; state: any }[],
    limitSize?: number
  ) {
    const queryConst = [];
    const sortBy = order?.map(({ name, state }) => orderBy(name, state));
    sortBy && sortBy?.length ? queryConst.push(...sortBy) : null;
    limitSize ? queryConst?.push(limit(limitSize)) : null;
    if (queryConst?.length) {
      const sortQuery = query(this.pendaftaranRef, ...queryConst);
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
