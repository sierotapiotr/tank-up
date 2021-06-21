import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';

@Injectable()
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {
  }

  private getDefaultConfig(): MatSnackBarConfig {
    return {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snack-bar-custom']
    };
  }

  public positive(message: string) {
    this.open(message, 'positive');
  }

  public negative(message: string) {
    this.open(message, 'negative');
  }

  private open(message: string, classes: string) {
    const config = this.getDefaultConfig();
    (config.panelClass as string[]).push(classes);
    this.snackBar.open(message, 'X', config);
  }
}
