import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginModule } from './pages/login/login.module';
import { ContactModule } from './pages/contact/contact.module';
import { ProfileModule } from './pages/profile/profile.module';
import { MainModule } from './pages/main/main.module';
import { RegisterModule } from './pages/register/register.module';
import { ShopModule } from './pages/shop/shop.module';
import { MenuModule } from './shared/menu/menu.module';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire/compat';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { ShopAdminComponent } from './pages/shop-admin/shop-admin.component'
import { ShopAdminModule } from './pages/shop-admin/shop-admin.module';

@NgModule({
  declarations : [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ContactModule,
    ProfileModule,
    ShopAdminModule,
    MainModule,
    RegisterModule,
    ShopModule,
    MenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
