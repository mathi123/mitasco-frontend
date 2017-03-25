/* tslint:disable:no-unused-variable */

import { inject, TestBed } from "@angular/core/testing";
import { UserSettingsService } from "../server-api/user-settings.service";

describe('UserSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSettingsService]
    });
  });

  it('should ...', inject([UserSettingsService], (service: UserSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
