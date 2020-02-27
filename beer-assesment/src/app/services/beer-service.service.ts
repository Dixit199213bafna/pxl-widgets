import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class BeerServiceService {

  constructor(private http: HttpClient) { }

  fetchLocation() {
    return this.http.get('v2/locations?key=659d5c6b8f3d2447f090119e48202fdb');
  }

  fetchBeerPerBrewId(brewId) {
    return this.http.get(`v2/brewery/${brewId}/beers?key=659d5c6b8f3d2447f090119e48202fdb`);
  }
}
