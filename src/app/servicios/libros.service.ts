import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libros } from '../interfaces/libros.interface';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  url: string = "http://localhost:3000/libros";

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Libros[]> {
    return this.http.get<Libros[]>(this.url);
  }

  post(libros: Libros): Observable<any> {
    return this.http.post(this.url, libros, { responseType: 'text' });
  }

  put(libros: Libros): Observable<any> {
    return this.http.put(this.url, libros, { responseType: 'text' });
  }

  delete(libros: Libros): Observable<any> {
    return this.http.delete(`${this.url}/${libros.id}`,{responseType: 'text'});
  }  
}
