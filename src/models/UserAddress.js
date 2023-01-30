export default class UserAddress {
  constructor(userId, cep, address, number, complement, area, city, state) {
    this.user_id = userId;
    this.cep = cep;
    this.address = address;
    this.number = number;
    this.complement = complement;
    this.area = area;
    this.city = city;
    this.state = state;
  }
}
