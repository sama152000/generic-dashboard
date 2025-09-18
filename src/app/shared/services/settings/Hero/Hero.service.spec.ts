/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeroService } from './Hero.service';

describe('Service: Hero', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService]
    });
  });

  it('should ...', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));
});
