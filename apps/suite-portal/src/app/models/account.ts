export class Account {

  private _name: string;
  private _email: string;
  private _unitNumber: string;
  private _serviceType: string;
  private _summary: string
  private _details: string;

  constructor() {
    this._name = '';
    this._email = '';
    this._unitNumber = '';
    this._serviceType = '';
    this._summary = '';
    this._details = '';
  }

  get name(): string{
    return this._name;
  }

  set name(value: string){
    this._name = value;
  }

  get email(): string{
    return this._email;
  }

  set email(value: string){
    this._email = value;
  }

  get unitNumber(): string{
    return this._unitNumber;
  }

  set unitNumber(value: string){
    this._unitNumber = value;
  }

  get serviceType(): string{
    return this._serviceType;
  }

  set serviceType(value: string){
    this._serviceType = value;
  }

  get summary(): string{
    return this._summary;
  }

  set summary(value: string){
    this._summary = value;
  }

  get details(): string{
    return this._details;
  }

  set details(value: string){
    this._details = value;
  }
}
