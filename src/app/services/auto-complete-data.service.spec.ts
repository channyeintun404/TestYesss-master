import { TestBed } from '@angular/core/testing';

import { AutoCompleteDataService } from './auto-complete-data.service';

describe('AutoCompleteDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoCompleteDataService = TestBed.get(AutoCompleteDataService);
    expect(service).toBeTruthy();
  });
});
