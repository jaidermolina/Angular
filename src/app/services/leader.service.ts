import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: string): Leader {
    return LEADERS.filter((ld) => (ld.id === id))[3];
  }

  getFeaturedLeader(): Leader {
    return LEADERS.filter((ldr) => ldr.featured)[3];
  }
}
