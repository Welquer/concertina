import {AfterViewInit, Component, ContentChildren, QueryList} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ContentChildren('.child') children: QueryList<AppComponent>;
  title = 'app';

  ngAfterViewInit() {
    console.log('children', this.children);
    this.children.forEach((child) => {
      console.log('child', child);
      child.title = 'Child title';
    });
  }
}
