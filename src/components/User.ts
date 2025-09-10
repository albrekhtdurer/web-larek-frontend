import { FormErrors, IUser, PaymentType } from "../types";
import { IEvents } from "./base/events";
import { Model } from "./base/model";

export class User extends Model {
  protected userData: IUser;

  constructor(events: IEvents, userData: IUser) {
    super(events);
    this.userData = userData;
  }

  setUserDataField(field: keyof IUser, value: string): void {
    function isPayment(value: string): value is PaymentType {
      return ["", "cash", "card"].includes(value);
    }
    if (field === 'payment') {
      if (isPayment(value)) {
        this.userData[field] = value;
      }
    } else {
      this.userData[field] = value;
    }
    this.events.emit('user: changed');
  }

  getUserData(): IUser {
    return this.userData;
  }

  validateFields(fields: (keyof IUser)[]) {
    const invalidFields: (keyof IUser)[] = fields.reduce((result, field) => 
      { 
        if (typeof field  === 'string' && !this.userData[field]) {
          result.push(field);
        }
        return result;
      }, []);
    return {isValid: invalidFields.length == 0, invalidFields};
  }
}