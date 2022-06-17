import { Chat } from "./Chat";
import { MessageBase } from "./MessageBase";

export interface MessagesOnChat extends MessageBase {
    messagesOnChat: Chat[]
}