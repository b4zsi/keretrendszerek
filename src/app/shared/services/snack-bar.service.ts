import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackbar : MatSnackBar) { }

  openWithMessage(message : string){
    this.snackbar.open(message,"", {duration: 2500});
  } 
}
