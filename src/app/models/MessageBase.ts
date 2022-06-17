import { DataLastMessage } from "./DataLastMessage";
import { NotificationLastMessage } from "./NotificationLastMessage";

export interface MessageBase {
    data: DataLastMessage;
    notification: NotificationLastMessage
}