import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Balance } from '../model/balance.model';

@Injectable()
export class BalanceService {

  private static API_PATH = 'api/balance';

  constructor(private httpClient: HttpClient) {
  }

  getBalance(userId: string): Observable<Balance> {
    return this.httpClient.get<Balance>(`${BalanceService.API_PATH}/${userId}/balance`)
  }

}
