import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component'; 
import { LoginFormComponent } from '../login-form/login-form.component'; 
import { MovieCardComponent } from '../movie-card/movie-card.component'; 

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
  //This is the function  that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

  // function to open the login form dialog when login button is clicked
  openLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280 px',
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
}
