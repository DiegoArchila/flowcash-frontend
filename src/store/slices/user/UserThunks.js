import { 

    SetUser,
    logout,
    
    startLoading,
    stopLoading,
    
    setErrors,
    errorsClear,

} from "./User";

import { flowcashApi } from "../../../api/flowcashApi";

export const UserThunks = {


    loginUser: (login) => {
        return async (dispatch) => {

            try {

                dispatch(startLoading());
    
                // Request HTTP
                const resp = await flowcashApi.post('/login', { login });

                const { data } = resp.data;

                const user = JSON.stringify(data);
                localStorage.setItem('MablaUser', user); 
    
                dispatch(SetUser({ 
                    userId: data.id,
                    userName: data.username,
                    role: data.role,
                    JWTToken: data.token
                }));

                return;

            } catch (error) {
                dispatch(setErrors(error.response?.data));
            } finally {
                dispatch(stopLoading());
            }   

        }
    },

    logoutUser: () => {
        return (dispatch) => {
            console.log('Deploying logoutUser thunk');
            localStorage.removeItem('MablaUser');
            dispatch(logout());
            dispatch(errorsClear());
        }
    }
};