import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  agentID: string;
  clientID: string;
  pairing: boolean;
  type: string;
  group: string;
  regular: boolean;

  constructor() { }

}
