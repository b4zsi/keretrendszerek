import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Image } from '../model/Image';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  collectionName = 'images';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage   ) { }


    loadImageMeta(metaUrl: string): Observable<Array<Image>> {
      // return this.http.get(environment.hostUrl + '/assets/' + metaUrl) as Observable<Array<Image>>;
      return this.afs.collection<Image>(this.collectionName).valueChanges();

    }

    loadImage(imageUrl: string) :Observable<string>{
      //return this.storage.storage.ref().child(imageUrl);
      // return this.http.get(environment.hostUrl + '/assets/' + imageUrl, {responseType: 'blob'});
      return this.storage.ref(imageUrl).getDownloadURL();
    }
}
