import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumTranslationService {

  constructor() { }

  isEnumType(type: any): boolean {
    return type !== String && type !== Number;
  }

  getEnumKeys(enumObject: any): string[] {
    return Object.keys(enumObject);
  }

  getEnumValueByKey(enumObject: any, key: string): string {
    return enumObject[key];
  }

  getKeyByValue(enumObject: any, value: string): string | undefined {
    for (const key in enumObject) {
      if (enumObject.hasOwnProperty(key) && enumObject[key] === value) {
        return key;
      }
    }
    return undefined;
  }

}
