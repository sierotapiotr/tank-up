import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/service/user.service';
import {CookieService} from 'ngx-cookie-service';
import {FormControl} from '@angular/forms';
import {CarService} from './shared/service/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private static CURRENT_USER_COOKIE_NAME = 'userId';

  public title = 'Tank up';
  public currentUserControl = new FormControl();

  constructor(private carService: CarService,
              private cookieService: CookieService,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCars();
    const currentUserId = this.cookieService.get(AppComponent.CURRENT_USER_COOKIE_NAME);
    this.userService.currentUserId.next(currentUserId);
    this.currentUserControl.setValue(currentUserId, {emitEvent: false});
    const currentCarId = this.cookieService.get(CarService.CURRENT_CAR_COOKIE_NAME);
    this.carService.currentCarId.next(currentCarId);
    this.listenForCurrentUserChanges();
  }

  private listenForCurrentUserChanges() {
    this.currentUserControl.valueChanges.subscribe(id => {
      this.userService.currentUserId.next(id);
      this.userService.setCurrentUserId(id).subscribe();
    })
  }

  private loadUsers(): void {
    this.userService.getAll().subscribe(users => {
      this.userService.users.next(users);
    });
  }

  private loadCars(): void {
    this.carService.getAll().subscribe(cars => {
      this.carService.cars.next(cars);
    })
  }
}
