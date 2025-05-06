import { 

    SetUser,
    logout,
    
    startLoading,
    stopLoading,
    
    setErrors,
    errorsClear,

} from "./User";

import { flowcashApi } from "../../../api/flowcashApi";


export const FlowcashThunks = {


    loginUser: (login) => {
        return async (dispatch) => {

            try {
                dispatch(startLoading());
    
                // Request HTTP
                const resp = await flowcashApi.post('/login', { login });

                const data= resp.data;
    
                dispatch(SetUser({ 
                    userId: data.id,
                    userName: data.username,
                    role: data.role,
                    JWTToken: data.token
                }));
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
            } finally {
                dispatch(stopLoading());
            }   

        }
    }
};