import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {


  signupForm!: FormGroup;
constructor(private authService: LoginService ,  private readonly router: Router){}
  ngOnInit() {
    this.signupForm = this.createUserFormGroup();
  }






  createUserFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl("", [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(2)]),
      phone: new FormControl("", [Validators.required, Validators.minLength(2)]),
      image: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }


  signup(): void {
    try {
    this.authService.signup(this.signupForm.value).subscribe((msg) => {
      if(msg != null || msg!= undefined){
        Swal.fire({
          position: "center",
          icon: "success",
          title: `User ${this.signupForm.value.email} Registred Successfully!`,
          showConfirmButton: false,
          timer: 1000
        }).then(()=>{
          this.router.navigate(["/signin"]);
        })
      }else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `User haven't created check you subimtted informations!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
   
    });
  } catch (error:any) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `User ${error.message}!`,
      showConfirmButton: false,
      timer: 1000
    });
  }
  }
}
