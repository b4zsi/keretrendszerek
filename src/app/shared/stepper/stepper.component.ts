import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartComponent } from 'src/app/pages/cart/cart.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {

  shippingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    zip: new FormControl('',Validators.required),
  });

  constructor(private fb: FormBuilder) {
  }

  submitShippingInfo() {
    // Handle form submission here
    console.log(this.shippingForm.value);
  }

}
