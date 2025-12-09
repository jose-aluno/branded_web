import { Component } from '@angular/core';
import { AddressService } from '../../../../services/address/address-service';
import { Address } from '../../../../models/address';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address',
  imports: [FormsModule],
  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class AddressProfile {
  constructor(private addressService: AddressService){}
  private user = JSON.parse(localStorage.getItem("user_data")!);

  address: Address = {
    cep: '',
    city: '',
    state: '',
    street: '',
    neighborhood: '',
    houseNumber: '',
    aptNumber: '',
    userId: this.user.userId
  }

  createAddress(){
    this.addressService.createAddress(this.address).subscribe({
      next: (res) => console.log("Endereço criado: ", res),
      error: (err) => console.error(err)
    })
  }
}
