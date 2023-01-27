import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-movie-db22.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  apiUrl = 'https://my-movie-db22.herokuapp.com/';

  constructor(private http: HttpClient) {}

  // POST request to API to register new user

  public userRegistration(user: IUser): Observable<any> {
    console.log(user);
    return this.http
      .post(apiUrl + 'users', user)
      .pipe(catchError(this.handleError));
  }

  // POST request to API to log in existing user

  public userLogin(user: any): Observable<any> {
    console.log(user);
    return this.http
      .post(apiUrl + 'login', user)
      .pipe(catchError(this.handleError));
  }

  // GET request to API to return all movies
  getAllMovies(): Observable<any> {
    return this.http
      .get<IMovie[]>(apiUrl + 'movies', {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        map((res: IMovie[]) => res || []),
        catchError(this.handleError)
      );
  }

  // GET request to API to return 1 movie
  getSingleMovie(title: string): Observable<any> {
    return this.http
      .get<IMovie>(`${apiUrl}movies/${title}`, {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        map((res: IMovie) => res || {}),
        catchError(this.handleError)
      );
  }

  // GET Director information by director name
  getDirector(name: string): Observable<any> {
    return this.http
      .get<IDirector>(`${apiUrl}movies/directors/${name}`, {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        map((res: IDirector) => res || {}),
        catchError(this.handleError)
      );
  }

  // GET Genre information by genre name
  getGenre(name: string): Observable<any> {
    return this.http
      .get<IGenre>(`${apiUrl}movies/genres/${name}`, {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        map((res: IGenre) => res || {}),
        catchError(this.handleError)
      );
  }

  // GET user details by name
  getUser(username: string): Observable<any> {
    console.log(username);
    return this.http
      .get<IUserID>(`${apiUrl}users/${username}`, {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        map((res: IUser) => res || {}),
        catchError(this.handleError)
      );
  }

  // Update user details
  updateUser(user: IUser): Observable<any> {
    const username = localStorage.getItem('user');
    console.log(username);
    console.log(user.Username);
    return this.http
      .put<IUser>(`${apiUrl}users/${username}`, user, {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        map((res: IUser) => res || {}),
        catchError(this.handleError)
      );
  }

  // delete user profile by name
  deleteUser(id: number): Observable<any> {
    return this.http
      .delete<string>(`${apiUrl}users/${id}`, {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        map((res: string) => res),
        catchError(this.handleError)
      );
  }

  // GET favorite movies for a user
  getFavoriteMovies(name: string): Observable<any> {
    return this.http
      .get<IUser>(`${apiUrl}users/${name}`, { headers: this.getHttpHeaders() })
      .pipe(
        map((res: IUser) => res.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  // ADD favorite movie to user profile by name and title
  addFavoriteMovies<IMovie>(name: string, id: number): Observable<any> {
    return this.http
      .post<IMovie>(`${apiUrl}users/${name}/${id}`, null, {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        map((res: IMovie) => res || {}),
        catchError(this.handleError)
      );
  }

  // delete favorite movie from the user profile
  deleteFavoriteMovies<IMovie>(name: string, id: number): Observable<any> {
    return this.http
      .delete<IMovie>(`${apiUrl}users/${name}/${id}`, {
        headers: this.getHttpHeaders(),
        responseType: 'text' as any,
      })
      .pipe(
        map((res: IMovie) => res || {}),
        catchError(this.handleError)
      );
  }

  getHttpHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
