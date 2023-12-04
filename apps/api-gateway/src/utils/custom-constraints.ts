import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { AGE_RESTRICTION } from '../constants';

import { ApiErrorMessages } from '@prj/common';

dayjs.extend(customParseFormat);

@ValidatorConstraint({ async: false })
export class AgeRestrictConstraint implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments) {
    const age = dayjs().diff(dayjs(value, 'YYYY-MM-DD'), 'year');
    return age >= AGE_RESTRICTION;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return ApiErrorMessages.REGISTER__AGE_RESTRICTION_VIOLATED;
  }
}

@ValidatorConstraint({ async: false })
export class DateConstraint implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments) {
    const date = dayjs(value, 'YYYY-MM-DD', true);
    return date.isValid();
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return ApiErrorMessages.REGISTER__INVALID_DATE;
  }
}
