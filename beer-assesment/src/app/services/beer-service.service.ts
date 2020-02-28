import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BeerServiceService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  fetchLocation() {
    return this.http.get('v2/locations?key=659d5c6b8f3d2447f090119e48202fdb');
  }

  fetchBeerPerBrewId(brewId) {
    return this.http.get(`v2/brewery/${brewId}/beers?key=659d5c6b8f3d2447f090119e48202fdb`);
  }

  fetchBeerPerBeerId(id) {
    return this.http.get(`v2/beer/${id}?key=659d5c6b8f3d2447f090119e48202fdb`);
  }

  changeMessage(obj) {
    this.messageSource.next(obj)
  }
}
