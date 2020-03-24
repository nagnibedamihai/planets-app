import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Planet } from '../models/planet';
import { environment } from '../environments/environment';

@Injectable({providedIn: 'root'})
export class PlanetService {

    private planetsUrl = `${environment.API_BASE_URL}/api/planets`;

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private http: HttpClient) {
    }

    getPlanets(page): Observable<any> {
        return this.http.get(this.planetsUrl, {...this.httpOptions, params: {page}})
            .pipe(
                tap(_ => this.log('fetched planets')),
                catchError(this.handleError('getPlanets', []))
            );
    }

    getPlanet(id: number): Observable<Planet> {
        const url = `${this.planetsUrl}/${id}`;
        return this.http.get<Planet>(url).pipe(
            tap(_ => this.log(`fetched planet id=${id}`)),
            catchError(this.handleError<Planet>(`getPlanet id=${id}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // log to console
            console.error(error);

            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }
}
