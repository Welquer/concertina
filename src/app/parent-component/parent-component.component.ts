import {Component, ElementRef, HostBinding, OnInit} from '@angular/core';
import {ConcertinaMonitorService} from '../services/concertina-monitor.service';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.css'],
  providers: [ConcertinaMonitorService]
})
export class ParentComponentComponent implements OnInit {
  @HostBinding('style.position') position: string;
  @HostBinding('style.top') top: string;
  @HostBinding('style.width') width: string;
  @HostBinding('style.height') height: string;
  @HostBinding('style.overflow') overflow: string;

  constructor(private concertinaMonitorService: ConcertinaMonitorService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.concertinaMonitorService.setParentElement(this.elementRef);
    console.log('this.concertinaMonitorService', this.concertinaMonitorService);
    this.position = 'absolute';
    this.top = '30px';
    this.width = '60%';
    this.height = 'calc(100% - 30px)';
    this.overflow = 'auto';
  }

}
