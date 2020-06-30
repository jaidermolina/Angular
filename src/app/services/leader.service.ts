import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable,of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import {Dish} from '../shared/dish';
import {baseURL} from '../shared/baseurl';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  getLeaders() : Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership');
  }
 
   getLeader(id: string) : Observable<Leader> {
     return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]));
  }
   getFeaturedLeader(): Observable<Leader>{
     return of (LEADERS.filter((lead) => lead.featured)[0]).pipe(delay(2000));
  }
  getleaderIds(): Observable<number[] | any> {
    return this.getLeaders().pipe(map(leaders => leaders.map(leader => leader.id)));
  }  
}
