import { Component } from '@angular/core';
import { Footer } from "../../../core/footer/footer";
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [Footer, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor( private fb: FormBuilder, private authService: Auth, private router: Router ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      alert('Por favor, preencha os campos corretamente.')
      return
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login feito com sucesso!', response)
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.error('Erro no login', err)
        alert('Email ou senha inválidos!')
      }
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      alert('Preencha todos os campos corretamente.')
      return
    }

    const { name, email, password, confirmPassword } = this.registerForm.value

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!')
      return;
    }

    const userToSend = { name, email, password };

    this.authService.register(userToSend).subscribe({
      next: (response) => {
        console.log('Usuário criado!', response)
        alert('Conta criada com sucesso!')
        this.router.navigate(['/'])
        this.registerForm.reset()
      },
      error: (err) => {
        console.error('Erro ao criar conta', err)
        alert('Erro ao criar conta.')
      }
    })
  }
}
