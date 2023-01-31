import { Component, OnInit, Input } from '@angular/core';

// mport to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// import to bring in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// import to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    private router: Router,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  hide = true;

  /**
   * This function is responsible for sending the form inputs to the backend
   * Saves token and username to local storage
   * navigates to movie-card-component after successful server authentication
   * @function loginUser
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result: IUserLogin) => {
        //Logic for a successful user login
        this.dialogRef.close(); // This will close the modal on success

        // Add token and username to local storage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.Username);

        this.snackBar.open(result.user.Username, 'Login successful', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => this.snackBar.open(result, 'Login Error', { duration: 2000 })
    );
  }
}
