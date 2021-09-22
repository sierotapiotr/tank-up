import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from './shared/service/user.service';
import {CookieService} from 'ngx-cookie-service';
import {MatSelect} from '@angular/material/select';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // @ViewChild(MatSelect, {static: false}) public currentUserSelect: MatSelect;

  private static CURRENT_USER_COOKIE_NAME = 'userId';
  public title = 'Tank up';
  public currentUserControl = new FormControl();

  constructor(private cookieService: CookieService,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers();
    const currentUserId = this.cookieService.get(AppComponent.CURRENT_USER_COOKIE_NAME);
    this.currentUserControl.setValue(currentUserId, {emitEvent: false});
    this.userService.currentUserId.next(currentUserId);
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
}
