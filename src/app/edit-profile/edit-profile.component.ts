import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user: any = {};

  @Input() userData: IUser = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  hide = true;

  /**
   * function responsible to retrieve user data from the backend
   * @function getUser
   * @returns {object} user
   */
  getUser(): void {
    const username = this.userService.getUserNameLocalStorage()!;
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    });
  }

  /**
   * function responsible to update user
   * clears local storage and redirects to and refreshes profile view
   * @function updateUser
   * */
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((resp: IUser) => {
      this.snackBar.open('User updated.', undefined, { duration: 3000 });
      localStorage.setItem('user', resp.Username);
      this.reloadComponent();
    });
    this.dialogRef.close();
  }

  /**
   * function responsible to refresh/reload component
   * @function reloadComponent
   *  */

  reloadComponent() {
    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {});
    });
  }
}
