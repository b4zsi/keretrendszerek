import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperRoutingModule } from './stepper-routing.module';
import { CartModule } from 'src/app/pages/cart/cart.module';
import { StepperComponent } from './stepper.component';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    StepperComponent,
  ],
  imports: [
    CommonModule,
    StepperRoutingModule,
    CartModule,
    //shipping
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,

  ],
  exports : [StepperComponent]
})
export class StepperModule { }
