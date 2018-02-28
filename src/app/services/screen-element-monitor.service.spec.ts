import { TestBed, inject } from '@angular/core/testing';

import { ScreenElementMonitorService } from './screen-element-monitor.service';

describe('ScreenElementMonitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenElementMonitorService]
    });
  });

  it('should be created', inject([ScreenElementMonitorService], (service: ScreenElementMonitorService) => {
    expect(service).toBeTruthy();
  }));
});
