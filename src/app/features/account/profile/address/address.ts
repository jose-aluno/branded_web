import { Component } from '@angular/core';
import { AddressService } from '../../../../services/address/address-service';
import { Address } from '../../../../models/address';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule],
  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class AddressProfile {
  addressForm!: FormGroup
  private user = JSON.parse(localStorage.getItem("user_data")!);
  addressId: any = null;

  constructor(private addressService: AddressService, private fb: FormBuilder){}

  address: Address = {
    cep: '',
    city: '',
    state: '',
    street: '',
    neighborhood: '',
    houseNumber: '',
    aptNumber: '',
    userId: this.user.id
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      cep: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      houseNumber: ['', Validators.required],
      aptNumber: ['']
    });

    this.addressService.findByUserId(this.user.id).subscribe({
      next: (res) => {
        console.log("Dados recebidos da API:", res);
        this.addressId = res.id;
        this.addressForm.patchValue(res); 
      },
      error: () => console.log("Nenhum endereço encontrado, o usuário pode criar um novo.")
    });
  }

  saveAddress(): void {
    const payload = this.addressForm.value;

    if (this.addressId) {
      this.addressService.updateAddress(this.addressId, payload).subscribe({
        next: (res) => console.log("Endereço atualizado!", res),
        error: (err) => console.error(err)
      });
    } else {
      const createPayload = { ...payload, userId: this.user.id };
      this.addressService.createAddress(createPayload).subscribe({
        next: (res) => {
          console.log("Endereço criado!", res);
          this.addressId = res.id;
        },
        error: (err) => console.error(err)
      });
    }
  }
}
