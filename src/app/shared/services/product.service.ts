import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Image } from '../model/Image';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basePath = 'images'

  constructor(
    private storage:AngularFireStorage,
    private afs : AngularFirestore,
    private snackbarService: SnackBarService
  ) { }

  chooseFile(event:any){
  }

  uploadProduct(){
    console.log("create");
  }

  deleteProduct(download_url : string, id:string) {
    if(!download_url) {
      this.afs.collection("images").doc(id).delete().catch((error)=>{
        console.log(error);
      });
    }else {
      this.storage.storage.refFromURL(download_url).delete();
    this.afs.collection("images").doc(id).delete().catch((error)=>{
      console.log(error);
    }).then(()=>{
      this.snackbarService.openWithMessage("Elem sikeresen törölve.")
      location.reload()
    });
    }
  }

  modifyProduct(){
    console.log("update")
    //leirast arat es nevet lehet modositani
  }

}
