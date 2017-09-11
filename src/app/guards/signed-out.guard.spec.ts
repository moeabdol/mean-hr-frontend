import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { SignedOutGuard } from './signed-out.guard';
import { AuthService } from '../services/auth.service';

describe('SignedOutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SignedOutGuard, AuthService]
    });
  });

  it('should ...', inject([SignedOutGuard], (guard: SignedOutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
