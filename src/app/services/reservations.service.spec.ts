import { TestBed } from '@angular/core/testing';

import { ReservationsService } from './reservations.service';

describe('ReservationsService', () => {
  let service: ReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('convertDayMonthYearToDate should convert a DayMonthYear object to a Date object', () => {
    const dayMonthYear = {
      day: 1,
      month: 1,
      year: 2021,
    };

    const date = service.convertDayMonthYearToDate(dayMonthYear);

    expect(date).toEqual(new Date(2021, 0, 1));
  });
});
