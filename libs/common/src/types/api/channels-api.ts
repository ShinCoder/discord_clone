export interface IGetDirectMessageChannelsDto {
  accountId: string;
}

export interface IGetDirectMessageChannelsResult {
  channels: Array<{
    id: string;
    ownerIds: Array<string>;
    createdAt: string;
    updatedAt: string;
  }>;
}

export interface ICreateDirectMessageChannelDto {
  ownerIds: Array<string>;
}
