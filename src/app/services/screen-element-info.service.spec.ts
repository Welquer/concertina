import { TestBed, inject } from '@angular/core/testing';

import { ScreenElementInfoService } from './screen-element-info.service';

describe('ScreenElementInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenElementInfoService]
    });
  });

  it('should be created', inject([ScreenElementInfoService], (service: ScreenElementInfoService) => {
    expect(service).toBeTruthy();
  }));
});
