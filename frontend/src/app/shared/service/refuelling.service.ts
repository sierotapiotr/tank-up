import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Refuelling} from '../model/refuelling.model';
import {Observable} from 'rxjs';

@Injectable()
export class RefuellingService {

  private static API_PATH = 'api/refuelling';

  constructor(private httpClient: HttpClient) {
  }

  addRefuelling(refuelling: Refuelling): Observable<Refuelling> {
    return this.httpClient.post<Refuelling>(`${RefuellingService.API_PATH}`, refuelling);
  }

}
