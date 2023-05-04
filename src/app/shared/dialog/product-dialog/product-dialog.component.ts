import { Component, Output ,Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {

  constructor(private dialogref : MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {nev: string}
    ){

  }

  productForm = new FormGroup({
    nev: new FormControl('', Validators.required),
    ar: new FormControl('', Validators.required),
    image_url: new FormControl('', Validators.required),
  });

save() {
  //firebase product upload
}
close() {
    this.dialogref.close();
}
  @Output() form = '';

}
