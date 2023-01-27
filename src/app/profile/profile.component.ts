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
  movies: IMovie[] = [];
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
    this.getMovies();
  }

  getUserData(): void {
    const username = this.userService.getUserNameLocalStorage();
    console.log(username);
    if (!username) {
      throw new Error('Unknown User in Profile Component');
    }

    this.fetchApiData.getUser(username).subscribe((response: IUserID) => {
      this.user = response;
    });
  }
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: IMovie[]) => {
      this.movies = resp;

      this.favMovies = resp.filter((movie) =>
        this.user.FavoriteMovies?.includes(movie._id)
      );
    });
  }

  openEditDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px',
    });
  }

  removeFavoriteMovie(name: string, id: number): void {
    this.fetchApiData.deleteFavoriteMovies(name, id).subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.fetchApiData.deleteUser(this.user._id).subscribe((resp: string) => {
        localStorage.clear();
        this.router.navigate(['welcome']);
      });
    }
  }
}
