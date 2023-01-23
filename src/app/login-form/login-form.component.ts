import { Component, OnInit, Input } from '@angular/core';

// mport to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// import to bring in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// import to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * gets user Name and token from API call userLogin, displays success or error message, navigates to Movie list /Homepage
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        //Logic for a successful user login
        this.dialogRef.close(); // This will close the modal on success
        // Add token and username to local storage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.username);
        this.snackBar.open('Login successful', 'OK', { duration: 2000 });
      },
      (result) => this.snackBar.open(result, 'OK', { duration: 2000 })
    );
  }
}
