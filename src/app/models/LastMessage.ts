import { DataLastMessage } from "./DataLastMessage";
import { LastMessageContact } from "./LastMessageContact";
import { NotificationLastMessage } from "./NotificationLastMessage";

export interface LastMessage {
  data: DataLastMessage;
  notification: NotificationLastMessage
  listLastMessages: LastMessageContact;
}
