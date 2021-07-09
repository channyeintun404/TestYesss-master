import { TestBed } from '@angular/core/testing';

import { UsergroupsService } from './usergroups.service';

describe('UsergroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsergroupsService = TestBed.get(UsergroupsService);
    expect(service).toBeTruthy();
  });
});
