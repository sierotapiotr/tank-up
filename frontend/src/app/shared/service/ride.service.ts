import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ride} from '../model/ride.model';

@Injectable()
export class RideService {

  private static API_PATH = 'api/ride';

  constructor(private httpClient: HttpClient) {
  }

  addRide(ride: Ride): Observable<Ride> {
    return this.httpClient.post<Ride>(`${RideService.API_PATH}`, ride);
  }

  getRides(userId: string): Observable<Ride[]> {
    return this.httpClient.get<Ride[]>(`${RideService.API_PATH}/${userId}`);
  }

  delete(rideId: string) {
    return this.httpClient.delete(`${RideService.API_PATH}/${rideId}`)
  }

  deleteAll() {
    return this.httpClient.delete(`${RideService.API_PATH}/all`);
  }
}
