import { UserActionsTypes } from './user.types';


export const setCurrentUser = user => ({

    type: UserActionsTypes,
    payload: user

});