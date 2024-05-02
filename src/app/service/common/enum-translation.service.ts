import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumTranslationService {

  constructor() { }

  isEnumType(type: any): boolean {
    return type !== String && type !== Number;
  }

  getKeys(enumObject: any): string[] {
    return Object.keys(enumObject);
  }

  getValueByKey(enumObject: any, key: string): string {
    return enumObject[key];
  }

}
