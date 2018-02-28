import {ElementRef, Injectable} from '@angular/core';
import {ElementToMonitor} from '../models/element-to-monitor';
import {ScreenElementInfoService} from "./screen-element-info.service";
import {isNullOrUndefined} from "util";

@Injectable()
export class ConcertinaMonitorService {
  elementsToMonitor: ElementToMonitor[] = [];
  parentElement: ElementRef;

  constructor(private screenElementInfoService: ScreenElementInfoService) { }

  public setParentElement(element: ElementRef) {
    this.parentElement = element;

    this.parentElement.nativeElement.onscroll = (event) => {
      requestAnimationFrame(() => {
        this.elementsToMonitor.forEach((elementBeingViewed) => {
          if (!isNullOrUndefined(elementBeingViewed.childBodyElement)) {
            const top = this.screenElementInfoService
              .getTopPosition(elementBeingViewed.childElement.nativeElement, this.parentElement.nativeElement);
            const height = this.screenElementInfoService
              .getHeight(elementBeingViewed.childElement.nativeElement);
            const bottom = top + height;
            const parentHeight = this.screenElementInfoService
              .getHeight(this.parentElement.nativeElement);
            const parentTop = this.parentElement.nativeElement.offsetTop;
            const parentBottom = parentTop + parentHeight;
            console.log('bottom', bottom, 'parentHeight', parentHeight);

            //Verifica posicionamento do header
            if (top < 0 && !elementBeingViewed.headerFixed) {
              const fakeElement = document.createElement('div');
              fakeElement.id = 'fakeElement';
              fakeElement.style.height = elementBeingViewed.childHeaderElement.nativeElement.offsetHeight + 'px';
              elementBeingViewed.childBodyElement.nativeElement.parentNode
                .insertBefore(fakeElement, elementBeingViewed.childBodyElement.nativeElement);
              elementBeingViewed.headerFixed = true;

              elementBeingViewed.childHeaderElement.nativeElement.style.width =
              elementBeingViewed.childHeaderElement.nativeElement.offsetWidth + 'px';
              elementBeingViewed.childHeaderElement.nativeElement.style.position = 'fixed';
              elementBeingViewed.childHeaderElement.nativeElement.style.top = this.parentElement.nativeElement.offsetTop + 'px';
              // elementBeingViewed.childFooterElement.nativeElement.style.position = 'fixed';
              // elementBeingViewed.childFooterElement.nativeElement.style.bottom = '0';
            } else if (top > 0) {
              const fakeElement = elementBeingViewed.childBodyElement.nativeElement.parentNode.querySelector('#fakeElement');
              if (!isNullOrUndefined(fakeElement)) {
                elementBeingViewed.childHeaderElement.nativeElement.style.position = '';
                elementBeingViewed.childHeaderElement.nativeElement.style.top = '';
                elementBeingViewed.childHeaderElement.nativeElement.style.width = '';
                fakeElement.remove();
                elementBeingViewed.headerFixed = false;
              }
            }

            //Verifica posicionamento do footer
            if (bottom > parentBottom && !elementBeingViewed.footerFixed && top < parentBottom) {
              console.log('here!');
              const fakeElement = document.createElement('div');
              fakeElement.id = 'fakeFooterElement';
              fakeElement.style.height = elementBeingViewed.childHeaderElement.nativeElement.offsetHeight + 'px';
              elementBeingViewed.childBodyElement.nativeElement.parentNode
                .insertBefore(fakeElement, elementBeingViewed.childFooterElement.nativeElement);
              elementBeingViewed.footerFixed = true;

              elementBeingViewed.childFooterElement.nativeElement.style.width =
                elementBeingViewed.childFooterElement.nativeElement.offsetWidth + 'px';
              elementBeingViewed.childFooterElement.nativeElement.style.position = 'fixed';
              elementBeingViewed.childFooterElement.nativeElement.style.top =
                (this.parentElement.nativeElement.offsetTop + parentHeight - 18) + 'px';
            } else if (bottom < parentBottom || (bottom > parentBottom && top > parentBottom && elementBeingViewed.footerFixed)) {
              console.log('bottom < parentBottom');
              const fakeElement = elementBeingViewed.childBodyElement.nativeElement.parentNode.querySelector('#fakeFooterElement');
              if (!isNullOrUndefined(fakeElement)) {
                elementBeingViewed.childFooterElement.nativeElement.style.position = '';
                elementBeingViewed.childFooterElement.nativeElement.style.top = '';
                elementBeingViewed.childFooterElement.nativeElement.style.width = '';
                fakeElement.remove();
                elementBeingViewed.footerFixed = false;
              }
            }
          }
        });
      });
    };
  }

  public addElementToMonitor(element: ElementToMonitor) {
    this.elementsToMonitor.push(element);
  }

  findElementsBeingViewed(): ElementToMonitor[] {
    const elementsToReturn = [];
    this.elementsToMonitor.forEach((element) => {
      const topPosition = this.screenElementInfoService
        .getTopPosition(element.childElement.nativeElement, this.parentElement.nativeElement);
      const height = this.screenElementInfoService
        .getHeight(element.childElement.nativeElement);
      const parentHeight = this.screenElementInfoService
        .getHeight(this.parentElement.nativeElement);
      const parentTop = this.parentElement.nativeElement.offsetTop;
      const parentBottom = parentTop + parentHeight;

      if ((topPosition < parentBottom && topPosition > 0) ||
          (topPosition + height < parentBottom && topPosition + height > 0) ||
          (topPosition < 0 && topPosition + height > parentBottom)) {
        elementsToReturn.push(element);
      } else {
        console.log('elementsToReturn', elementsToReturn);
        return elementsToReturn;
      }
    });
    return elementsToReturn;
  }

}
