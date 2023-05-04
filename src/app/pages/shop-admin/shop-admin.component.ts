import { Component, OnInit } from '@angular/core';
import { Image } from '../../shared/model/Image';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { take } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDialogComponent } from 'src/app/shared/dialog/product-dialog/product-dialog.component';

@Component({
  selector: 'app-shop-admin',
  templateUrl: './shop-admin.component.html',
  styleUrls: ['./shop-admin.component.scss']
})
export class ShopAdminComponent implements OnInit{
  isPageLoaded: boolean = false;
  galleryObject?: Array<Image>;
  loadedImage?: string;
  loadedimages?: string[] = [];

  constructor(
    private galleryService : GalleryService,
    private productService:ProductService,
    private dialog:MatDialog
    ){}

  ngOnInit(): void{
      this.galleryService.loadImageMeta('__credits.json').pipe(take(1)).subscribe((data: Array<Image>) => {
        this.galleryObject = data;
        for(let i = 0;i < this.galleryObject!.length;++i){
          this.galleryService.loadImage(this.galleryObject!.at(i)!.image_url).pipe(take(1)).subscribe(data => {
            this.galleryObject![i].download_url = data
          });
        }
      })
  }

  loadImage(urls: string[]) {
    for(let i = 0;i < this.galleryObject!.length;++i){
      this.galleryService.loadImage(urls[i]).subscribe((data)=>{
        this.loadedimages?.push(data);
      });
    }
  }
  deleteProduct(download_url:string, id:string){
    this.productService.deleteProduct(download_url, id);
  }

  addProduct(){

    this.openDialog();
   this.productService.uploadProduct();
  }

  updateProduct(){
    this.productService.modifyProduct();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ProductDialogComponent, dialogConfig);
  }


}
