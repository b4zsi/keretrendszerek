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
      return this.afs.collection<Image>(this.collectionName).valueChanges();

    }

    loadImage(imageUrl: string) :Observable<string>{
      return this.storage.refFromURL("gs://keretrendszerek.appspot.com/images/"+imageUrl).getDownloadURL();
    }

    uploadImage(image: File, filename: string){
      let metadata = { contentType: 'image/jpeg', }
      const filePath = `images/${filename}`;
      const fileRef = this.storage.ref(filePath);
      return this.storage.upload(filePath, image, metadata);
    }
}
