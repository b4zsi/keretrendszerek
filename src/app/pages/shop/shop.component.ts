import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { Image } from '../../shared/model/Image';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../shared/model/User';
import { take } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from 'src/app/shared/dialog/product-dialog/product-dialog.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  isAdminUser:boolean = false
  isPageLoaded: boolean = false;
  user?: Array<User>;
  galleryObject?: Array<Image>;
  loadedImage?: string;
  loadedimages?: string[] = [];
  loggedUser?: firebase.default.User | null = null;

  constructor(
    private galleryService : GalleryService,
    private cartService : CartService,
    private userService: UserService,
    private productService:ProductService,
    private dialog:MatDialog,
    private snackbarService:SnackBarService
    ){}

   ngOnInit(): void{
    this.loggedUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User

      this.galleryService.loadImageMeta('__credits.json').pipe(take(1)).subscribe((data: Array<Image>) => {
        this.galleryObject = data;
        for(let i = 0;i < this.galleryObject!.length;++i){
          if(this.galleryObject!.at(i)!.image_url) {
            this.galleryService.loadImage(this.galleryObject!.at(i)!.image_url).pipe(take(1)).subscribe(data => {
              this.galleryObject![i].download_url = data
            });
          }
        }
        this.userService.getByEmail(this.loggedUser!.email!).pipe(take(1)).subscribe(data=>{
          data[0].isAdmin ? this.isAdminUser = true : this.isAdminUser = false
          this.isPageLoaded = true;
        });
      })
  }

 toCart(ar : number, nev:string): void {
  this.cartService.addToCart(ar, nev);
  this.snackbarService.openWithMessage('Termék sikeresen a kosárhoz adva.');
 }

 checkAdmin(email:string): boolean {
  return this.userService.isAdminUser(email);
 }

 deleteProduct(download_url:string, id:string) {
  this.productService.deleteProduct(download_url, id);
 }

 openDialog(nev:string, ar:number) {
  const dialogRef = this.dialog.open(ProductDialogComponent,{
    data:{nev:nev, ar:ar}
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      console.log(result);
    }
  });
 }
}
