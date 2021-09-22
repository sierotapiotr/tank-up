import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RefuellingComponent} from './refuelling/refuelling.component';
import {RideComponent} from './ride/ride.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {RefuellingService} from './shared/service/refuelling.service';
import {BalanceService} from './shared/service/balance.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {SnackbarService} from './shared/service/snackbar.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HistoryComponent} from './history/history.component';
import {RideService} from './shared/service/ride.service';
import { AdminComponent } from './admin/admin.component';
import {UserService} from './shared/service/user.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RefuellingComponent,
    RideComponent,
    HistoryComponent,
    AdminComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTabsModule
    ],
  providers: [
    FlexLayoutModule,
    RefuellingService,
    RideService,
    BalanceService,
    SnackbarService,
    UserService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
