export const Endpoints = {
    FRIEND: {
        ACCEPT_REQUEST: "acceptRequest",
        AVAILABLE_FRIENDS: "availableFriends",
        BASE: "friend/",
        PENDING_REQUESTS: "pendingRequests",
        REJECT_REQUEST: "rejectRequest",
        REMOVE_FRIEND: "removeFriend",
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
        ADD: "add",
        BASE: "message/",
        CHATROOM: {
            ADD_MESSAGE: "add/message",
            ALL: "all",
            BASE: "message/chatroom/",
            MESSAGES: "messages",
            STATS: "stats",
        },
        PENDING_DIRECT_MESSAGES: "pendingDirectMessages",
        SEND_DIRECT_MESSAGE: "sendDirectMessage",
        THREAD: {
            ADD_MESSAGE: "addMessage",
            ALL_MESSAGES: "getAll/messages",
            ALL_THREADS: "getAll",
            BASE: "message/thread/",
            CREATE: "create",
            MESSAGES: "messages",
        },
    },
    USER: {
        BASE: "user/",
        BULK_DASHBOARD: "bulkDashboardInformation",
        CLEAR_USER_STATE: "clearUserState",
        CONFIRM_EMAIL: "confirmEmail",
        DASHBOARD: "dashboardInformation",
        DETAILS: "details",
        DOES_EXIST: "doesUsernameExist",
        EDIT: "edit",
        IS_EMAIL_VALID: "isEmailValid",
        LOGIN: "login",
        LOGOUT: "logout",
        PING_STATE_EXPIRATION: "pingUserStateExpiration",
        SIGNUP: "signup",
        STATUS: "status",
        TOTAL_USERS: "totalUsers",
        UPDATE_STATE: "updateUserState",
        USERS_ONLINE: "usersOnline",
    },
};
