import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Car} from '../model/car.model';

@Injectable()
export class CarService {

  private static API_PATH = 'api/car';
  public static CURRENT_CAR_COOKIE_NAME = 'carId';

  constructor(private httpClient: HttpClient) {
  }

  public cars = new BehaviorSubject<Car[]>([]);
  public currentCarId = new BehaviorSubject<string>(null);

  create(name: string): Observable<Car> {
    return this.httpClient.post<Car>(`${CarService.API_PATH}`, name)
  }

  getAll(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${CarService.API_PATH}/all`)
  }

  delete(id: string) {
    return this.httpClient.delete(`${CarService.API_PATH}/${id}`)
  }

  setCurrentCarCookie(carId: string) {
    return this.httpClient.post(`${CarService.API_PATH}/setCurrentCar`, carId);
  }

  setCurrentCar(carId: string) {
    this.setCurrentCarCookie(carId).subscribe(() => {
      this.currentCarId.next(carId);
    });

  }
}
