const session = {
    token: sessionStorage.getItem("token"),
};


let userName;
let userId;
let userType;
const payloadStart = session.token.indexOf(".") + 1;
const payloadEnd = session.token.lastIndexOf(".");
let payload = session.token.substring(payloadStart, payloadEnd);

if (payload.length === 0) {
} else {
    payload = atob(payload);
    const jsonPayload = JSON.parse(payload);
    userType = jsonPayload.userType;
    userName = jsonPayload.name;
    userId = jsonPayload.id;
}