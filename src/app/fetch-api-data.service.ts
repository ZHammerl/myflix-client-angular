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

  /**
   * POST request to API to register new user
   * @param user
   * @returns new user object in JSON
   * */
  public userRegistration(user: IUser): Observable<any> {
    return this.http
      .post(apiUrl + 'users', user)
      .pipe(catchError(this.handleError));
  }

  /**
   * POST request to API to log in existing user
   * @param user
   * @returns data of user in JSON
   * */
  public userLogin(user: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', user)
      .pipe(catchError(this.handleError));
  }

  /**
   *  GET request to API to return all movies
   * @returns array of all movie objects in JSON
   **/
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

  /**
   * GET request to API to return 1 movie
   * @param title
   * @returns movie data object in JSON
   * */
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

  /**
   * GET request to API to retrieve Director information by director name
   * @param name (of director)
   * @returns director data object in JSON
   * */
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

  /**
   * GET request to API to retrieve Genre information by genre name
   * @param name (of genre)
   * @returns genre data object in JSON
   * */
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

  /**
   * GET request to API to retrieve user details by name
   * @param username
   * @returns user data object in JSON
   * */
  getUser(username: string): Observable<any> {
    return this.http
      .get<IUserID>(`${apiUrl}users/${username}`, {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        map((res: IUser) => res || {}),
        catchError(this.handleError)
      );
  }

  /**
   * PUT request to API to update user details
   * @param user
   * @returns user data in JSON object
   * */
  updateUser(user: IUser): Observable<any> {
    const username = localStorage.getItem('user');
    return this.http
      .put<IUser>(`${apiUrl}users/${username}`, user, {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        map((res: IUser) => res || {}),
        catchError(this.handleError)
      );
  }

  /**
   * make API call to delete user profile by id
   * @param id
   * @returns string message
   *  */
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

  /**
   * GET request to API to retrieve favorite movies for a user
   * @param name
   * @returns array of strings in JSON object holding favorite movies
   * */
  getFavoriteMovies(name: string): Observable<any> {
    return this.http
      .get<IUser>(`${apiUrl}users/${name}`, { headers: this.getHttpHeaders() })
      .pipe(
        map((res: IUser) => res.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * POST request to API to add favorite movie to user profile by name and title
   * @param name (of user)
   * @param id (of movie)
   * @returns JSON object holding movie data
   *  */
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

  /**
   * make API call to delete favorite movie from the user profile
   * @param name (of user)
   * @param id (of movie)
   * @returns string message
   *  */
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

   /**
   * make API call to provide http header with bearer and token
   * @returns http header with bearer and token
   */
  getHttpHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /**
   * handles errors
   * @param error
   * @returns error message
   */
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
