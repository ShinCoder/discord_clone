export enum MONTHS {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12
}

export const OLDEST_BIRTH_YEAR = 1871;
export const NEAREST_BIRTH_YEAR = 2020;

export const IS_DEV =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
