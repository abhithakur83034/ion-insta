import { TestBed } from '@angular/core/testing';

import { FollowfollowingService } from './followfollowing.service';

describe('FollowfollowingService', () => {
  let service: FollowfollowingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowfollowingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
