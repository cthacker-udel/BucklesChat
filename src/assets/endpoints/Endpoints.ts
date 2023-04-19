export const Endpoints = {
    FRIEND: {
        ACCEPT_REQUEST: "acceptRequest",
        AVAILABLE_FRIENDS: "availableFriends",
        BASE: "friend/",
        PENDING_REQUESTS: "pendingRequests",
        REJECT_REQUEST: "rejectRequest",
        REMOVE_FRIEND: "removeFriend",
        SEND_DIRECT_MESSAGE: "sendDirectMessage",
        SEND_REQUEST: "sendRequest",
    },
    IMAGE: {
        BASE: "https://api.imgbb.com/1/",
        UPLOAD: "upload",
    },
    LOGGER: {
        BASE: "logger/",
        EVENT: "event",
        EXCEPTION: "exception",
        STATUS: "status",
    },
    MESSAGE: {
        BASE: "message/",
        THREAD: {
            ADD_MESSAGE: "addMessage",
            BASE: "message/thread/",
            CREATE: "create",
        },
    },
    USER: {
        BASE: "user/",
        BULK_DASHBOARD: "bulkDashboardInformation",
        DASHBOARD: "dashboardInformation",
        DETAILS: "details",
        DOES_EXIST: "doesUsernameExist",
        EDIT: "edit",
        LOGIN: "login",
        SIGNUP: "signup",
        STATUS: "status",
        TOTAL_USERS: "totalUsers",
        USERS_ONLINE: "usersOnline",
    },
};
