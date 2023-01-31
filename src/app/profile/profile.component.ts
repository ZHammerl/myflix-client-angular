import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserService } from '../user.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUserID = {
    _id: 0,
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };
  favMovies: IMovie[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getFavMovies();
  }

  /**
   * function responsible to retrieve user data from the backend
   * @function getUserData
   * @returns {object} user
   */
  getUserData(): void {
    const username = this.userService.getUserNameLocalStorage();
    if (!username) {
      throw new Error('Unknown User in Profile Component');
    }

    this.fetchApiData.getUser(username).subscribe((response: IUserID) => {
      this.user = response;
    });
  }

  /**
   * function responsible to retrieve favorite movie list from the backend
   * @function getFavMovies
   * @returns {object} of favorite movies in the provided array
   */
  getFavMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: IMovie[]) => {
      this.favMovies = resp.filter((movie) =>
        this.user.FavoriteMovies?.includes(movie._id)
      );
    });
  }

  /**
   * Opens dialog to edit user profile
   * @event click Button on HTML template
   */
  openEditDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px',
    });
  }

  /**
   * function responsible to delete movie from favorite movie list in the database (backend)
   * @function removeFavoriteMovie.
   * @param {string} name of user
   * @param {number} id of movie
   * @returns {object} of updated user
   */
  removeFavoriteMovie(name: string, id: number): void {
    this.fetchApiData.deleteFavoriteMovies(name, id).subscribe((result) => {
      this.ngOnInit();
    });
  }


  /**
   * function to open confirmation dialog, delete profile and redirect to welcome view
   * @function deleteProfile
   * */
  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.fetchApiData.deleteUser(this.user._id).subscribe((resp: string) => {
        localStorage.clear();
        this.router.navigate(['welcome']);
      });
    }
  }
}
