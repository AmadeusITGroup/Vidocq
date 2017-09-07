import { TestBed, inject } from '@angular/core/testing';

import { HttpErrorService } from './http-error.service';

describe('HttpErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorService]
    });
  });

  it('should ...', inject([HttpErrorService], (service: HttpErrorService) => {
    expect(service).toBeTruthy();
  }));
});
