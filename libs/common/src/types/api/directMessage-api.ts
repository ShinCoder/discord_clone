export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
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
