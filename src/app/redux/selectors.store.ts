import { createSelector } from '@ngrx/store';
import { ClientStoreType } from '../models/ClientType';
import { MessageType } from '../models/MessageType';

 
export interface AppState {
  client: ClientStoreType;
  messages: MessageType[]
}
 
export const selectClientFeature = (state: AppState) => state.client;
export const selectMessagesFeature = (state: AppState) => state.messages;
 
export const selectUser = createSelector(
  selectClientFeature,
  (state: ClientStoreType) => state.user
);

export const selectClient = createSelector(
  selectClientFeature,
  (state: ClientStoreType) => state
);

export const selectToken = createSelector(
  selectClientFeature,
  (state: ClientStoreType) => state.user.token
);

export const selectMessages = createSelector(
  selectMessagesFeature,
  (state: MessageType[]) => state
);