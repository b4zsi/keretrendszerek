import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopAdminRoutingModule } from './shop-admin-routing.module';
import { ShopAdminComponent } from './shop-admin.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ShopAdminComponent
  ],
  imports: [
    CommonModule,
    ShopAdminRoutingModule,
    MatListModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ShopAdminModule { }
