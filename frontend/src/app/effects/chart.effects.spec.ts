import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ChartEffects } from './chart.effects';

describe('ChartEffects', () => {
  let actions$: Observable<any>;
  let effects: ChartEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChartEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ChartEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
