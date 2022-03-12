import { createAction, props } from "@ngrx/store";
import { MessageType } from "src/app/models/MessageType";


export const updateAll = createAction('[Message] update all', props<{messages: MessageType[]}>());