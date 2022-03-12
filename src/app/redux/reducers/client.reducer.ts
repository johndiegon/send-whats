import { createReducer, on } from '@ngrx/store';
import { ClientStoreType, UserStoreType } from 'src/app/models/ClientType';
import { signin, signout, updateClient } from '../actions/client.action';


const initalUser: UserStoreType = {
    login: '',
    role: 'user',
    signed: false,
    token: undefined,
    limitLoggedIn: undefined
}

export const initialState: ClientStoreType = {
    user: initalUser
};

const _clientReducer = createReducer(
    initialState,
    on(updateClient, (state, client) => {
        return {
            id: client.id,
            name: client.name,
            lastName: client.lastName,
            docNumber: client.docNumber,
            docType: client.docType,
            email: client.email,
            address: client.address,
            phone: client.phone,
            idUser: client.idUser,
            status: client.status,
            user: state.user
        }
    }),
    on(signin, (state, user) => {

        const newState = { ...state, user };
        return newState;
    }),
    on(signout, (state) => {
        localStorage.setItem("client", JSON.stringify(initialState));
        return initialState;
    })
);


export function clientReducer(state, action) {
    return _clientReducer(state, action);
}