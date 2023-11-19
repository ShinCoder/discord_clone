/* eslint-disable */

export const protobufPackage = 'com.common';

export enum MessageStatusType {
  SUCCESS = 0,
  ERROR = 1,
  UNRECOGNIZED = -1
}

export interface MessageStatus {
  type: MessageStatusType;
  statusCode: number;
  message?: string | undefined;
}

export const COM_COMMON_PACKAGE_NAME = 'com.common';
