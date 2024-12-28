import dayjs, { Dayjs } from 'dayjs';

import { AccountDto, MessageType } from '@prj/types/api';

export interface ProcessedMessage {
  key: string;
  content: string;
  type: MessageType;
  createdAt: Dayjs;
  isError: boolean;
}

export interface ProcessedMessageClump {
  key: string;
  sender: AccountDto;
  messages: Array<ProcessedMessage>;
  isError: boolean;
}

export interface ProcessedMessageDate {
  key: string;
  date: Dayjs;
  messageClumps: Array<ProcessedMessageClump>;
}

export const processMessageForDisplay = (data: {
  messages: Array<{
    id?: string;
    senderId: string;
    content: string;
    type: MessageType;
    createdAt: string;
  }>;
  senders: Array<AccountDto>;
}): Array<ProcessedMessageDate> => {
  const filterByDate = data.messages.reduce(
    (accum, e) => {
      const date = dayjs(e.createdAt);

      if (accum.length === 0) {
        return [
          {
            key: date.format(),
            date,
            messages: [
              {
                ...e,
                key: e.id || date.valueOf().toString(),
                createdAt: date,
                isError: !e.id
              }
            ]
          }
        ];
      }

      if (date.isSame(accum[accum.length - 1].date, 'day')) {
        return [
          ...accum.slice(0, -1),
          {
            key: accum[accum.length - 1].key,
            date: accum[accum.length - 1].date,
            messages: [
              ...accum[accum.length - 1].messages,
              {
                ...e,
                key: e.id || date.valueOf().toString(),
                createdAt: date,
                isError: !e.id
              }
            ]
          }
        ];
      }

      return [
        ...accum,
        {
          key: date.format(),
          date,
          messages: [
            {
              ...e,
              key: e.id || date.valueOf().toString(),
              createdAt: date,
              isError: !e.id
            }
          ]
        }
      ];
    },
    [] as Array<{
      key: string;
      date: Dayjs;
      messages: Array<{
        key: string;
        senderId: string;
        content: string;
        type: MessageType;
        createdAt: Dayjs;
        isError: boolean;
      }>;
    }>
  );

  const filterBySender = filterByDate.map((_day) => ({
    key: _day.key,
    date: _day.date,
    messageClumps: _day.messages.reduce((accum, _message) => {
      if (accum.length === 0) {
        const sender = data.senders.find(
          (_sender) => _sender.id === _message.senderId
        );
        if (sender) {
          return [
            {
              key: sender.id + _message.key,
              sender,
              messages: [_message],
              isError: _message.isError
            }
          ];
        }
        return [];
      }

      if (
        accum[accum.length - 1].sender.id === _message.senderId &&
        accum[accum.length - 1].isError === _message.isError
      ) {
        return [
          ...accum.slice(0, -1),
          {
            key: accum[accum.length - 1].key,
            sender: accum[accum.length - 1].sender,
            messages: [...accum[accum.length - 1].messages, _message],
            isError: accum[accum.length - 1].isError
          }
        ];
      }

      const sender = data.senders.find(
        (_sender) => _sender.id === _message.senderId
      );
      if (sender) {
        return [
          ...accum,
          {
            key: sender.id + _message.key,
            sender,
            messages: [_message],
            isError: _message.isError
          }
        ];
      }
      return accum;
    }, [] as Array<ProcessedMessageClump>)
  }));

  return filterBySender;
};

export const concatenateProcessedMessages = (
  data1: Array<ProcessedMessageDate>,
  data2: Array<ProcessedMessageDate>
): Array<ProcessedMessageDate> => {
  if (data1.length > 0 && data2.length > 0) {
    const data1Last = data1[data1.length - 1];
    const data2First = data2[0];

    if (data1Last.date.isSame(data2First.date, 'day')) {
      let mergedItem: ProcessedMessageDate;

      const data1LastClump =
        data1Last.messageClumps[data1Last.messageClumps.length - 1];
      const data2FirstClumb = data2First.messageClumps[0];

      if (
        data1LastClump.sender.id === data2FirstClumb.sender.id &&
        data1LastClump.isError === data2FirstClumb.isError
      ) {
        mergedItem = {
          key: data1Last.key,
          date: data1Last.date,
          messageClumps: [
            ...data1Last.messageClumps.slice(0, -1),
            {
              key: data1LastClump.key,
              sender: data1LastClump.sender,
              messages: [
                ...data1LastClump.messages,
                ...data2FirstClumb.messages
              ],
              isError: data1LastClump.isError
            },
            ...data2First.messageClumps.slice(1)
          ]
        };
      } else {
        mergedItem = {
          key: data1Last.key,
          date: data1Last.date,
          messageClumps: [
            ...data1Last.messageClumps,
            ...data2First.messageClumps
          ]
        };
      }

      return [...data1.slice(0, -1), mergedItem, ...data2.slice(1)];
    }
  }

  return [...data1, ...data2];
};
