import { createAction, props } from '@ngrx/store';
import { ClientApiType, UserStoreType } from 'src/app/models/ClientType';

export const updateClient = createAction('[Client] update client', props<ClientApiType>());
export const signin = createAction('[Client] signin', props<UserStoreType>());
export const signout = createAction('[Client] signout');
