/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomPagesService } from './custom-pages.service';

describe('Service: CustomPages', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomPagesService]
    });
  });

  it('should ...', inject([CustomPagesService], (service: CustomPagesService) => {
    expect(service).toBeTruthy();
  }));
});
