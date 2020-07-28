import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  public get(): Observable<any> {
    return this.httpClient.get(this.SERVER_URL)
      .pipe(
        catchError(this.handleError)
      );
  }

  public delete(id: number): Observable<any> {
    const url = `${this.SERVER_URL}/${id}`;
    return this.httpClient.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  public post(newUser: User): Observable<any> {
    return this.httpClient.post(this.SERVER_URL, newUser)
      .pipe(
        catchError(this.handleError)
      );
  }

  public put(id: number, user: User): Observable<any> {
    const url = `${this.SERVER_URL}/${id}/`;
    return this.httpClient.put(url, user)
      .pipe(
        catchError(this.handleError)
      );
  }
}
