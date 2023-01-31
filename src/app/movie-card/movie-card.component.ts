import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: IMovie[] = [];
  favoriteMovies: any[] = [];
  user: IUser = {
    Username: '',
    Email: '',
    Birthday: '',
    Password: '',
    FavoriteMovies: [],
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserData();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: IMovie[]) => {
      this.movies = res;
      return this.movies;
    });
  }

  /**
   * gets user data from API call and an array of favorite movies
   */
  getUserData(): void {
    const username = this.userService.getUserNameLocalStorage();
    if (!username) {
      throw new Error('Unknown User in Movie Card Component');
    }

    this.fetchApiData.getUser(username).subscribe((response: IUserID) => {
      this.user = response;
    });
  }

  getFavoriteMovies(): void {
    const username = this.userService.getUserNameLocalStorage();
    if (!username) {
      throw new Error('Unknown User in Movie Card Component');
    }

    this.fetchApiData.getFavoriteMovies(username).subscribe((response) => {
      this.favoriteMovies = response || [];
    });
  }
  // check, if movie is in user's favorite list
  isFav(id: number): boolean {
    return this.favoriteMovies?.includes(id);
  }

  // select movies as favorite movie
  addToFavoriteMovie(name: string, id: number): void {
    this.fetchApiData.addFavoriteMovies(name, id).subscribe((result) => {
      this.favoriteMovies = result.favoriteMovies;
      this.ngOnInit();
    });
  }

  // deselect movie as favorite movie
  removeFromFavoriteMovie(name: string, id: number): void {
    this.fetchApiData.deleteFavoriteMovies(name, id).subscribe((result) => {
      this.favoriteMovies = result.favoriteMovies;
      this.ngOnInit();
    });
  }

  openDirectorDialog(
    Name: string,
    Bio: string,
    Birthyear?: any,
    Deathyear?: any
  ): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: Name,
        Bio: Bio,
        Birth: Birthyear,
        Death: Deathyear,
      },
      width: '500px',
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  openMovieDetailsDialog(
    title: string,
    description: string,
    actors: string
  ): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Title: title,
        Description: description,
        Actors: actors,
      },
      width: '500px',
    });
  }
}
