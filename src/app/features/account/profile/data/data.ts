import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../services/auth';
import { UserService } from '../../../../services/user/user-service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-data',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './data.html',
  styleUrl: './data.css',
})
export class Data {
  profileForm: FormGroup
  userId: string | null = null
  
  constructor( private fb: FormBuilder, private authService: Auth, private userService: UserService ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: [''], 
      newPassword: [''],
      confirmNewPassword: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromStorage();

    if (this.userId) {
      
      this.userService.findById(this.userId).subscribe({
        next: (user: User) => {
          this.profileForm.patchValue({
            name: user.name,
            email: user.email
          });
        },
        error: (err) => {
          console.error('Erro ao carregar perfil', err);
        }
      });
    }
  }

  onSave() {
    if (!this.userId) return;
    if (this.profileForm.invalid) return;

    const { name, email, newPassword, confirmNewPassword } = this.profileForm.value;

    const dataToUpdate: any = { name, email };

    if (newPassword) {
      if (newPassword !== confirmNewPassword) {
        alert('A nova senha e a confirmação não coincidem!');
        return;
      }
      dataToUpdate.password = newPassword;
    }

    this.userService.update(this.userId, dataToUpdate).subscribe({
      next: (res) => {
        alert('Dados atualizados com sucesso!');
        this.profileForm.patchValue({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      },
      error: (err) => {
        console.error('Erro ao atualizar', err);
        alert('Não foi possível atualizar os dados.');
      }
    });
  }
}
