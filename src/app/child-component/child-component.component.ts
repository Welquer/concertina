import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {ConcertinaMonitorService} from '../services/concertina-monitor.service';
import {ElementToMonitor} from '../models/element-to-monitor';
import {Builder} from '../models/i-builder.builder';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {
  @ViewChild('headerElement') headerElement: ElementRef;
  @ViewChild('bodyElement') bodyElement: ElementRef;
  @ViewChild('footerElement') footerElement: ElementRef;
  @HostBinding('style.display') display = 'flex';
  @HostBinding('style.flex-flow') flexFlow = 'column';
  @HostBinding('style.margin') margin = '10px 0';

  bodyIsVisible = false;
  pdfData = '';
  options = 'abcdefghijklmnopqrstuvwxyz0123456789';
  elementToMonitor: ElementToMonitor;
  backgroundHeaderColor: string;

  colors = ['#00427b',
            '#d2527b',
            '#98627b',
            '#65724b',
            '#22a005',
            '#00927b',
            '#01027b'];

  constructor(private concertinaMonitorService: ConcertinaMonitorService,
              private elementRef: ElementRef) {
    this.backgroundHeaderColor = this.backgroundColor();
  }

  ngOnInit() {
    while (this.pdfData.length < 3000) {
      const position = Math.floor(Math.random() * this.options.length) + 1;
      this.pdfData += this.options.substr(position, 1);
    }

    this.elementToMonitor = Builder<ElementToMonitor>()
                              .childElement(this.elementRef)
                              .childHeaderElement(this.headerElement)
                              .childFooterElement(this.footerElement)
                              .build();
    this.concertinaMonitorService.addElementToMonitor(this.elementToMonitor);
  }

  toogle() {
    this.bodyIsVisible = !this.bodyIsVisible;

    requestAnimationFrame(() => {
      this.elementToMonitor.childBodyElement = this.bodyElement;
    });
  }

  backgroundColor() {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }

}
