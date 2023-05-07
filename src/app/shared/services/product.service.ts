import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Image } from '../model/Image';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basePath = 'images'

  constructor(
    private storage:AngularFireStorage,
    private afs : AngularFirestore
  ) { }

  chooseFile(event:any){
  }

  uploadProduct(){
    console.log("creaate");
  }

  deleteProduct(download_url : string, id:string) {
    if(!download_url) {
      console.log("hello")
      this.afs.collection("images").doc(id).delete().catch((error)=>{
        console.log(error);
      });
    }else {
      this.storage.storage.refFromURL(download_url).delete();
    this.afs.collection("images").doc(id).delete().catch((error)=>{
      console.log(error);
    });
    }
  }

  modifyProduct(){
    console.log("update")
    //leirast arat es nevet lehet modositani
  }

}
