import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/service/user.service';
import {User} from '../shared/model/user.model';
import {FormControl} from '@angular/forms';
import {Car} from '../shared/model/car.model';
import {CarService} from '../shared/service/car.service';
import {CarStatus} from '../shared/model/car-status.enum';
import {Refuelling} from '../shared/model/refuelling.model';
import {RefuellingService} from '../shared/service/refuelling.service';
import {RideService} from '../shared/service/ride.service';
import {forkJoin} from 'rxjs';
import {SnackbarService} from '../shared/service/snackbar.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../dialog/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public userNameControl = new FormControl();
  public carNameControl = new FormControl();

  constructor(private carService: CarService,
              private refuellingService: RefuellingService,
              private rideService: RideService,
              private snackbarService: SnackbarService,
              public userService: UserService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  get activeCars(): Car[] {
    return this.carService.cars.getValue().filter(value => value.status === CarStatus.ACTIVE);
  }

  public addUser(name: string): void {
    const user = new User().fromForm({name});
    this.userService.create(user).subscribe(createdUser => {
      this.userService.users.getValue().push(createdUser);
    });
  }

  private deleteUser(id: string): void {
    this.userService.delete(id).subscribe(() => {
      const users = this.userService.users.getValue().filter(user => user.id !== id);
      this.userService.users.next(users);
    });
  }

  public addCar(name: string) {
    this.carService.create(name).subscribe(car => {
      this.carService.cars.getValue().push(car);
    });
  }

  private deleteCar(id: string) {
    this.carService.delete(id).subscribe(() => {
      const cars = this.carService.cars.getValue().filter(car => car.id !== id);
      this.carService.cars.next(cars);
    });
  }

  public handleDeleteUserClicked(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {data: {question: `Czy na pewno chcesz usunąć użytkownika ${user.name}?`}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user.id);
      }
    });
  }

  public handleDeleteCarClicked(car: Car): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {question: `Czy na pewno chcesz usunąć samochód ${car.name}?`}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCar(car.id);
      }
    });
  }

  public handleResetHistoryClicked(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {question: 'Czy na pewno chcesz zresetować historię?'}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetHistory();
      }
    });
  }

  private resetHistory(): void {
    forkJoin([
      this.refuellingService.deleteAll(),
      this.rideService.deleteAll()])
      .subscribe(() => {
        this.snackbarService.positive('Historia zresetowana.');
      });
  }
}
