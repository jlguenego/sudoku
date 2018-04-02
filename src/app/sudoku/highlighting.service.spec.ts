import { TestBed, inject } from '@angular/core/testing';

import { HighlightingService } from './highlighting.service';

describe('HighlightingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightingService]
    });
  });

  it('should be created', inject([HighlightingService], (service: HighlightingService) => {
    expect(service).toBeTruthy();
  }));
});
