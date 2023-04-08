import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { Image } from '../../shared/model/Image';
import { User } from 'src/app/shared/model/User';
import {debounceTime, take } from 'rxjs';
import { Product } from 'src/app/shared/model/product';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  isPageLoaded: boolean = false;
  galleryObject?: Array<Image>;
  loadedImage?: string;
  loadedimages?: string[] = [];
  loadedimagesbeta?: Array<Product> = []
  user?: User;

  constructor(private galleryService : GalleryService){}

   ngOnInit(): void{
    setTimeout(()=>{
      this.galleryService.loadImageMeta('__credits.json').subscribe((data: Array<Image>) => {
        this.galleryObject = data;
      })
    },1)
    setTimeout(()=>{
      for(let i = 0;i < this.galleryObject!.length;++i){
        console.log(i)
        this.galleryService.loadImage(this.galleryObject!.at(i)!.image_url).subscribe(data => {
          //this.loadedImage = data;
          //this.loadedimages?.push(data);
          this.galleryObject![i].download_url = data
        });
      }
        },1000)
      setTimeout(()=>{
        //this.mergeToOne(this.galleryObject!)
        this.isPageLoaded = true;
      },1000);

        
  }
  loadImage(urls: string[]) {
    for(let i = 0;i < this.galleryObject!.length;++i){
      console.log(i);
      this.galleryService.loadImage(urls[i]).subscribe((data)=>{
        this.loadedimages?.push(data);
        this.loadedimagesbeta![i].download_url = data
      });
    }
  }

  mergeToOne(galleryobject:Array<Image>){
    for(let i = 0;i < galleryobject.length;++i){
      this.loadedimagesbeta![i].id = galleryobject[i].id
      this.loadedimagesbeta![i].leiras = galleryobject[i].leiras
      this.loadedimagesbeta![i].ar = galleryobject[i].ar


    }
  }
    
}
