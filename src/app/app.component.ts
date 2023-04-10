import { AfterViewInit, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit{
  title = 'keretrendszerek';
  page = '';
  routes: Array<string> = [];
  loggedInUser? : firebase.default.User | null;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService : AuthService, private elementRef:ElementRef) {
  }
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style
  }
  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });

    this.authService.isUserLoggedIn().subscribe(user=>{
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      if(this.loggedInUser?.email === 'hello@hello.com'){
          this.isAdmin = true;
      }
    }, error => {
      console.log(error);
      localStorage.setItem('user', JSON.stringify('null'));

    })
  }
  
  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }
  logout(_? : boolean) {
    this.authService.logout().then(()=>{
      console.log("U have been logged out.");
    }).catch(error=>{console.log(error)});
  }
}
