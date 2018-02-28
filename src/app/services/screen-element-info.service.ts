import { Injectable } from '@angular/core';

@Injectable()
export class ScreenElementInfoService {

  constructor() { }

  public getTopPosition(element: HTMLElement, targetElement: HTMLElement): number {
    return element.offsetTop - targetElement.scrollTop;
  }

  public getHeight(element: HTMLElement): number {
    return element.offsetHeight;
  }

}
