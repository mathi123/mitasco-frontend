/* tslint:disable:no-unused-variable */

import { inject, TestBed } from "@angular/core/testing";
import { UrlTrackingService } from "./url-tracking.service";

describe('UrlTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlTrackingService]
    });
  });

  it('should ...', inject([UrlTrackingService], (service: UrlTrackingService) => {
    expect(service).toBeTruthy();
  }));
});
