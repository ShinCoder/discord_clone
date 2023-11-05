import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { AGE_RESTRICTION } from '../constants';

@ValidatorConstraint({ async: false })
export class AgeRestrictConstraint implements ValidatorConstraintInterface {
  validate(value: Date, validationArguments?: ValidationArguments) {
    const age = new Date().getFullYear() - value.getFullYear();
    return age >= AGE_RESTRICTION;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return 'Age restriction violated';
  }
}
