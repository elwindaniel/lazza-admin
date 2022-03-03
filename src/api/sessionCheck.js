import axios from "./axios";
import { API_URL } from "./constants";
export const USERS_ID = "ui";
export const TOKEN = "token";
export const CLIENTID = "clientId";

class SessionCheck {
    basicJWTAuthentication(phoneNumber, password, userType) {
        let obj = { phoneNumber: phoneNumber, password: password, userType: userType };
        return axios.post(`${API_URL}user/authenticate`, obj);
    }

    //const url = `${API_URL}/users/authenticate`;
    createJWTToken(token) {
        return ("Bearer " + token).toString();
    }

    setSessionForJWt(token) {
        sessionStorage.setItem(TOKEN, token);
        this.setUpAxiosInterceptors(this.createJWTToken(token));
    }

    removeSession() {
        sessionStorage.removeItem(TOKEN);
    }

    checkSession() {
        let a = sessionStorage.getItem(TOKEN);
        if (a === null) return false;
        return true;
    }

    getLoggedinUserId() {
        let a = sessionStorage.getItem(TOKEN);
        let payload = "";
        if (a) {
            const payloadStart = a.indexOf(".") + 1;
            const payloadEnd = a.lastIndexOf(".");
            payload = a.substring(payloadStart, payloadEnd);
        }

        let userDetails = {
            userId: "",
            userName: "",
            userEmail: "",
            userPhoneNumber: "",
        };

        if (payload.length !== 0) {
            payload = atob(payload);
            const jsonPayload = JSON.parse(payload);
            userDetails.userId = jsonPayload.id;
            userDetails.userName = jsonPayload.name;
            userDetails.userEmail = jsonPayload.email;
            userDetails.userPhoneNumber = jsonPayload.phoneNumber;
            userDetails.userType = jsonPayload.userType;
        }

        if (payload.length === 0) return "";
        return userDetails;
    }


    setUpAxiosInterceptors(token) {
        axios.interceptors.request.use((config) => {
            if (this.checkSession()) {
                config.headers.authorization = token;
            }
            return config;
        });
    }
}
export default new SessionCheck();