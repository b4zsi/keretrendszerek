import { Component, Output ,Inject, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Image } from '../../model/Image';
import { SnackBarService } from '../../services/snack-bar.service';
import { GalleryService } from '../../services/gallery.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent{

  constructor(private dialogref : MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {nev: string}
    , private firestore: AngularFirestore, private snackbarService :SnackBarService,
    private imageService :GalleryService){

  }

  productForm = new FormGroup({
    nev: new FormControl('', Validators.required),
    ar: new FormControl('', Validators.required),
    evjarat:new FormControl('', Validators.required),
    kilometeroraAllas:new FormControl('',Validators.required),
    image_url: new FormControl('', Validators.required),
  });

  display: FormControl = new FormControl('', [Validators.required]);
  upload?: File;

save() {
  const autoId = this.firestore.collection('images').doc().ref.id;
  let imageDownloadURL = ""
  this.imageService.uploadImage(this.upload!, this.upload!.name).then((snapshot) => {
    location.reload();
    this.imageService.loadImage(this.upload!.name).pipe(take(1)).subscribe((data)=>{
      imageDownloadURL = data
    })
  });

  const image : Image = {
      id:autoId,
      image_url: this.upload!.name,
      nev:this.productForm.get('nev')?.value as string,
      ar: parseInt(this.productForm.get('ar')!.value as string),
      evjarat:parseInt(this.productForm.get('evjarat')!.value as string),
      kilometeroraAllas:parseInt(this.productForm.get('kilometeroraAllas')!.value as string),
      download_url:imageDownloadURL
  }
    this.firestore.collection('images').doc(autoId).set(image).then(()=>{
      this.snackbarService.openWithMessage("termék sikeresen hozzáadva");
      this.dialogref.close();
    });
}

handleFileInputChange($event: any): void {
  this.upload = $event.target.files[0];
  if (typeof this.upload !== "undefined") {
    this.display.patchValue(this.upload.name);
  } else {
    this.display.patchValue("");
  }
}

close() {
    this.dialogref.close();
}
  @Output() form = '';

}
