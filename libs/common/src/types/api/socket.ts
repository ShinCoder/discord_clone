import {
  DirectMessageDto,
  FailedDirectMessageDto,
  MessageType
} from './directMessage-api';

export interface IJoinDirectMessageRoomData {
  targetId: string;
}

export interface ILeaveDirectMessageRoomData {
  targetId: string;
}

export interface ISendDirectMessageData {
  targetId: string;
  content: string;
  type: MessageType;
}

export interface IReceiveDirectMessageDto {
  message: DirectMessageDto;
}

export interface IReceiveFailedDirectMessageDto {
  message: FailedDirectMessageDto;
}
