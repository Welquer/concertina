import { TestBed, inject } from '@angular/core/testing';

import { ScreenElementManipulatorService } from './screen-element-manipulator.service';

describe('ScreenElementManipulatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenElementManipulatorService]
    });
  });

  it('should be created', inject([ScreenElementManipulatorService], (service: ScreenElementManipulatorService) => {
    expect(service).toBeTruthy();
  }));
});
