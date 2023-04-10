import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Image } from '../model/Image';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private storage:AngularFireStorage,
    private afs : AngularFirestore
  ) { }

   // public file:Image ;
    

  chooseFile(event:any){
  }

  createProduct(){
    //const storageRef = this.storage.ref(this.storage)
    console.log("creaate");
    //kep upload es a tobbi
  }

  deleteProduct(download_url : string, id:string) {
    this.storage.storage.refFromURL(download_url).delete();
    this.afs.collection("images").doc(id).delete();
    //first delete picture from storage than document
   //ide jo lenne egy snackbar
  }

  modifyProduct(){
    //ide is kene egy snackbar
    console.log("update")
    //leirast arat es nevet lehet modositani
  }

}
