import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: string): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((ld) => (ld.id === id))[3]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((ldr) => ldr.featured)[3]);
  }
}
