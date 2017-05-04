import { TestBed, inject } from '@angular/core/testing';

import { OverallService } from './overall.service';

describe('OvellallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OverallService]
    });
  });

  it('should ...', inject([OverallService], (service: OverallService) => {
    expect(service).toBeTruthy();
  }));
});
