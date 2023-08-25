import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { Image } from '../../shared/model/Image';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../shared/model/User';
import { Observable, switchMap, take } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from 'src/app/shared/dialog/product-dialog/product-dialog.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {FormControl, FormsModule, } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers:[{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],
  encapsulation:ViewEncapsulation.None,
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
    private snackbarService:SnackBarService,
    private firestore:AngularFirestore
    ){}

    cteIDs:string[]=[];

    date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

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

      this.cheaperThanAverage().pipe(take(1)).subscribe((images:any)=>{
        for(let image of images){
          this.cteIDs.push(image.id)
        }
      });
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
 //osszetett lekerdezes 1
  cheaperThanAverage() :Observable<Image[]>{
    return this.firestore.collection<Image>('images').valueChanges().pipe(
      switchMap((products) => {
        if (!products || products.length === 0) {
          return [];
        }
        const averagePrice = products.reduce((total:number, p:any) => total + p.ar, 0) / products.length;
        return this.firestore.collection<Image>('images', ref => ref.where('ar', '<', averagePrice).orderBy('ar').limit(3)).valueChanges();
      })
    );
  }

}
