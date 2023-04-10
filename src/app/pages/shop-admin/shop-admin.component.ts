import { Component, OnInit } from '@angular/core';
import { Image } from '../../shared/model/Image';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { ProductService } from 'src/app/shared/services/product.service';

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
    private productService:ProductService
    ){}

  ngOnInit(): void{
    setTimeout(()=>{
      this.galleryService.loadImageMeta('__credits.json').subscribe((data: Array<Image>) => {
        this.galleryObject = data;
      })
    },1)
    setTimeout(()=>{
      for(let i = 0;i < this.galleryObject!.length;++i){
        this.galleryService.loadImage(this.galleryObject!.at(i)!.image_url).subscribe(data => {
          this.galleryObject![i].download_url = data
        });
      }
        },3000)
      setTimeout(()=>{
        this.isPageLoaded = true;
      },2000);
  }

  loadImage(urls: string[]) {
    for(let i = 0;i < this.galleryObject!.length;++i){
      this.galleryService.loadImage(urls[i]).subscribe((data)=>{
        this.loadedimages?.push(data);
        //this.loadedimagesbeta![i].download_url = data
      });
    }
  }
  deleteProduct(){
    //this.productService.deleteProduct();
  }

  addProduct(){
   this.productService.createProduct();
  }

  updateProduct(){
    this.productService.modifyProduct();
  }
}
