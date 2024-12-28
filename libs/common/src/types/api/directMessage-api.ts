export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

export interface FailedDirectMessageDto {
  senderId: string;
  targetId: string;
  content: string;
  type: MessageType;
  createdAt: string;
}

export interface DirectMessageDto {
  id: string;
  senderId: string;
  targetId: string;
  content: string;
  type: MessageType;
  createdAt: string;
  updatedAt: string;
}

export interface IGetDirectMessagesQuery {
  senderId: string;
  targetId: string;
  take?: number;
  page?: number;
  skip?: number;
}

export interface IGetDirectMessagesResult {
  messages: Array<DirectMessageDto>;
  totalPages: number;
}
