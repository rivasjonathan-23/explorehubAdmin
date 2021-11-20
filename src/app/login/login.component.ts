import { DialogService } from './../service/dialog.service';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public alert = false;
  public show = true;
  constructor(private authService: AdminService, private router: Router,
    private dialogService: DialogService) { }
  public eye = false;
  public passwordOrText = 'password';
  public credentialsForm = {
    username: '',
    password: ''
  };
  public serverErrorMessages = '';
  ngOnInit() {

  }
  onSubmit() {
    this.show = false
    let partialDataHandler;
    this.authService.login(this.credentialsForm).subscribe((user: any) => {
      partialDataHandler = user;
      this.show = true;
      if (partialDataHandler.status != false) {
        this.authService.setToken(user.token);
        this.authService.loggedInAdmin.emit()
        this.router.navigate(['admin/bookingNotif']);
      } else {
        // if(!this.alert ){
        this.alert == true;
        this.dialogService.openConfirmedDialog(partialDataHandler.sms);
        this.router.navigate(['']);
        // }

      }
    });
  }
  showAndHide() {
    this.eye = !this.eye;
  }

  goToAboutPage() {
    this.router.navigate(['About']); // here "About" is name not path
  }

}
