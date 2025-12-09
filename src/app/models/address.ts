export interface Address {
  id?: string;
  cep: string
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  houseNumber: string;
  aptNumber?: string;
  userId: string
}
