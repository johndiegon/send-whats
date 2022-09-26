import { LastMessageContact } from "./LastMessageContact";
import { MessageBase } from "./MessageBase";

export interface LastMessage extends MessageBase {
  listLastMessages: LastMessageContact;  
}
