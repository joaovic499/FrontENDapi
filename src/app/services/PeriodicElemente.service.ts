
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../models/PeriodicElement';

@Injectable()
export class PeriodicElementService{
  elementApiUrl = "http://localhost:4567/usuarios";
  constructor(private http: HttpClient) { }

  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.elementApiUrl);
   }

   createElements(element: PeriodicElement): Observable<PeriodicElement>{

    return this.http.post<PeriodicElement>(this.elementApiUrl, element);
   }

   editElement(element: PeriodicElement): Observable<PeriodicElement> {

    console.log(element);
    return this.http.put<PeriodicElement>(`${this.elementApiUrl}/${element.id}`, element)
   }

   deleteElement(id: number): Observable<any>{
    return this.http.delete<any>(`${this.elementApiUrl}/${id}`);
   }
}

