import { createReducer, on } from "@ngrx/store";
import { MessageType } from "src/app/models/MessageType";
import { updateAll } from "../actions/message.action";

export const initialState: MessageType[] = [];

const _messageReducer = createReducer(
    initialState,
    on(updateAll, (state, message) => {
        return message.messages
    })
)

export function messageReducer(state, action) {
    return _messageReducer(state, action);
}