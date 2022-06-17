import { ActiveMessageLast } from "./ActiveMessageLast";

export interface LastMessageContact {
    id: string;
    idClient: string;
    phoneFrom: string;
    messageList: ActiveMessageLast[];
}