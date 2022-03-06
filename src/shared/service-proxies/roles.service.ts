import { ProxyServiceBase } from '../models/proxyBase.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService  implements ProxyServiceBase {

  constructor() { }
  findAll(): void {
    throw new Error('Method not implemented.');
  }

  findById(id: string): void {
    throw new Error('Method not implemented.');
  }

  create(createDto: Record<string, any>): void {
    throw new Error('Method not implemented.');
  }

  update(id: string, updateDto: Record<string, any>): void {
    throw new Error('Method not implemented.');
  }

  delete(id: string): void {
    throw new Error('Method not implemented.');
  }


  resetStores(): void {

  }
}
