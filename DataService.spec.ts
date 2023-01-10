import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const testData = [{ id: 1, date: '2021-10-10' }];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get data', () => {
    service.getData().subscribe(data => {
      expect(data).toEqual(testData);
    });
    
    const req = httpMock.expectOne(`${service.apiUrl}/data`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
  
  it('should patch data', () => {
    const updatedData = { id: 1, name: 'Updated' };
    service.patchData(updatedData).subscribe();
    
    const req = httpMock.expectOne(`${service.apiUrl}/data`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(updatedData);
    req.flush(updatedData);
  });
});