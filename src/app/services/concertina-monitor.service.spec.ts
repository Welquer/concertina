import { TestBed, inject } from '@angular/core/testing';

import { ConcertinaMonitorService } from './concertina-monitor.service';

describe('ConcertinaMonitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcertinaMonitorService]
    });
  });

  it('should be created', inject([ConcertinaMonitorService], (service: ConcertinaMonitorService) => {
    expect(service).toBeTruthy();
  }));
});
