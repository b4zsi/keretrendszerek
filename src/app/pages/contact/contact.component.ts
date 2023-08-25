import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
onSubmit(arg0: any) {
throw new Error('Method not implemented.');
}

  FormData!: FormGroup;

constructor(private builder: FormBuilder, private contact:EmailService) {}

ngOnInit() {
    this.FormData = this.builder.group({
      nev:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      uzenet:new FormControl('', Validators.required)
    })
}
}
import { EmailService } from 'src/app/shared/services/email.service';


