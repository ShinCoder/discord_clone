import dayjs, { Dayjs } from 'dayjs';

import { AccountDto, MessageType } from '@prj/types/api';

export interface ProcessedMessage {
  id: string;
  content: string;
  type: MessageType;
  createdAt: Dayjs;
}

export interface ProcessedMessageClump {
  sender: AccountDto;
  messages: Array<ProcessedMessage>;
}

export interface ProcessedMessageDate {
  date: Dayjs;
  messageClumps: Array<ProcessedMessageClump>;
}

export const processMessageForDisplay = (data: {
  messages: Array<{
    id: string;
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
            date,
            messages: [{ ...e, createdAt: date }]
          }
        ];
      }

      if (date.isSame(accum[accum.length - 1].date, 'day')) {
        return [
          ...accum.slice(0, -1),
          {
            date: accum[accum.length - 1].date,
            messages: [
              ...accum[accum.length - 1].messages,
              { ...e, createdAt: date }
            ]
          }
        ];
      }

      return [
        ...accum,
        {
          date,
          messages: [{ ...e, createdAt: date }]
        }
      ];
    },
    [] as Array<{
      date: Dayjs;
      messages: Array<{
        id: string;
        senderId: string;
        content: string;
        type: MessageType;
        createdAt: Dayjs;
      }>;
    }>
  );

  const filterBySender = filterByDate.map((_day) => ({
    date: _day.date,
    messageClumps: _day.messages.reduce((accum, _message) => {
      if (accum.length === 0) {
        const sender = data.senders.find(
          (_sender) => _sender.id === _message.senderId
        );
        if (sender) {
          return [
            {
              sender,
              messages: [_message]
            }
          ];
        }
        return [];
      }

      if (accum[accum.length - 1].sender.id === _message.senderId) {
        return [
          ...accum.slice(0, -1),
          {
            sender: accum[accum.length - 1].sender,
            messages: [...accum[accum.length - 1].messages, _message]
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
            sender,
            messages: [_message]
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

      if (data1LastClump.sender.id === data2FirstClumb.sender.id) {
        mergedItem = {
          date: data1Last.date,
          messageClumps: [
            ...data1Last.messageClumps.slice(0, -1),
            {
              sender: data1LastClump.sender,
              messages: [
                ...data1LastClump.messages,
                ...data2FirstClumb.messages
              ]
            },
            ...data2First.messageClumps.slice(1)
          ]
        };
      } else {
        mergedItem = {
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
