import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {

  constructor() { }

  loadingWithPromise(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      setTimeout(() => {
        if (email === 'test@gmail.com' && password === 'testpw') {
          resolve(true);
        } else {
          reject(false);
        }
      }, 3000);
    });
  }
}
