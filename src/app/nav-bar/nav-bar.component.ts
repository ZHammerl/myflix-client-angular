import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
constructor(public router: Router){}

ngOnInit(): void{}

navigateToMovies(): void{
  this.router.navigate(['movies'])
}

navigateToProfile(): void{
  this.router.navigate(['profile'])
}

logout(): void{
  localStorage.clear()// removes all data from localStorage
  this.router.navigate(['welcome']) // redirects the user to the welcome page to be able to login  or register
}
}
