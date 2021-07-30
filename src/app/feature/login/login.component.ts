import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '@shared/service/authenticate.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public enviado = false;


  constructor(
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.construirFormularioLogin();
  }
  get f() { return this.loginForm.controls; }

  private construirFormularioLogin(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(){
    this.enviado = true;
    if (this.loginForm.valid){
       this.authenticateService.login(this.loginForm.value).subscribe( (user) => {
        if (user.sessionToken){
          this.redirect();
        }
      });

    }

  }

  public redirect(){
    this.router.navigate(['/home']);
  }
}
