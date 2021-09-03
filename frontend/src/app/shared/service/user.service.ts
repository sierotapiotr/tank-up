import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user.model';

@Injectable()
export class UserService {

  private static API_PATH = 'api/user';

  constructor(private httpClient: HttpClient) {
  }

  public users = new BehaviorSubject<User[]>([]);
  public currentUserId = new BehaviorSubject<string>(null);

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${UserService.API_PATH}/all`)
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(`${UserService.API_PATH}`, user)
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${UserService.API_PATH}/${user.id}`, user)
  }

  delete(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${UserService.API_PATH}/${id}`)
  }
}
