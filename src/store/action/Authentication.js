import * as actionType from './actionType';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionType.AUTH_START
    }
};

export const authSuccess=(token,userId)=>{
    return{
        type:actionType.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
};

export const authFail=(error)=>{
    return{
        type:actionType.AUTH_FAIL,
        error:error
    }
}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expiresDate');
    localStorage.removeItem('userId');

    return{
        type:actionType.AUTH_LOGOUT,
    }
}

export const checkAuthLogout=(expireId)=>{
    return dispatch=>{
    setTimeout(()=>{
        dispatch(logout());
    },expireId*1000);
}
}

export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHDq60a15jy87qNFe-VGXi0zi6PxxU58A';
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHDq60a15jy87qNFe-VGXi0zi6PxxU58A';
        }
        axios.post(url,authData)
        .then(response=>{
            const expiresDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expiresDate',expiresDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthLogout(response.data.expiresIn));
        })
        .catch(error=>{
            dispatch(authFail(error.response.data.error));
        })
    }

}

export const setAuthRedirectPath=(path)=>{
    return{
        type:actionType.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState=()=>{
    return dispatch=>{
       const token=localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expirestion=new Date(localStorage.getItem('expiresDate'));
            if(expirestion<=new Date()){
                dispatch(logout());
            }
            else{
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthLogout((expirestion.getTime()-new Date().getTime())/1000));
            }
        }

    }
}