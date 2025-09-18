/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OverviewService } from './Overview.service';

describe('Service: Overview', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OverviewService]
    });
  });

  it('should ...', inject([OverviewService], (service: OverviewService) => {
    expect(service).toBeTruthy();
  }));
});
