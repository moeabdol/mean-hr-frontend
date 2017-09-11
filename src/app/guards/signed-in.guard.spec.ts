import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { SignedInGuard } from './signed-in.guard';
import { AuthService } from '../services/auth.service';

describe('SignedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SignedInGuard, AuthService]
    });
  });

  it('should ...', inject([SignedInGuard], (guard: SignedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
