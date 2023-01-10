import { TestBed } from '@angular/core/testing';
import { DateFormatService } from './date-format.service';

describe('DateFormatService', () => {
  let service: DateFormatService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateFormatService]
    });
    service = TestBed.get(DateFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format date correctly', () => {
    const date = new Date(2020, 0, 1, 2, 3, 9);
    const formattedDate = service.formatDate(date);
    expect(formattedDate).toEqual('2020-January-01 2:03:09');
  });

  it('should add days', () => {
    const date = new Date(2020, 0, 1, 2, 3, 9);
    const newDate = service.addDaysToDate(date, 2);
    expect(newDate).toEqual(new Date(2020, 0, 3, 2, 3, 9));
  });

  it('should format relative time', () => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    const formattedTime = service.formatRelativeTime(date);
    expect(formattedTime).toEqual('2 days ago');
  });
});