import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  user:any;
  invalidUser = false;
  validUser = false;
  errorMessage = "";
  successMessage = ""

  listRole : string[] =[]

  constructor(
    private userService: UserService,
    private router: Router) { }

    CheckboxChange(e : any){
      if(e.target.checked){
        this.listRole.push(e.target.value)
      }
    }

  register(myform:any){
    this.user = {
      'username': myform.value.username,
      'email': myform.value.email,
      'password': myform.value.password,
      'role': this.listRole
    }

  this.userService.createUser(this.user).subscribe(

    (response :any)=> {
      //this.router.navigate(['login']);

      this.validUser = true
      this.successMessage = response.message
      myform.resetForm(myform);
    },

    error => {
      this.invalidUser = true
      this.errorMessage = error.error.message
     // console.log(error)
    }

  );
}

}
