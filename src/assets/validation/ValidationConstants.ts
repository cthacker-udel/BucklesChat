import { RegexConstants } from "../regex";

export const ValidationConstants = {
    CHAT: {
        ADD_MESSAGE: {
            MAX_LENGTH: 280,
            REQUIRED: true,
        },
    },
    CREATE_CHAT: {
        DESCRIPTION: {
            MAX_LENGTH: 256,
            REQUIRED: false,
        },
        NAME: {
            MAX_LENGTH: 128,
            REQUIRED: true,
        },
    },
    EDIT_MODAL: {
        DATE_OF_BIRTH: {
            REQUIRED: false,
        },
        EMAIL: {
            MAX_LENGTH: 120,
            REQUIRED: false,
        },
        FIRST_NAME: {
            MAX_LENGTH: 70,
            PATTERN: RegexConstants.NO_DIGITS_SYMBOLS_SPACES,
            REQUIRED: false,
        },
        HANDLE: {
            MAX_LENGTH: 12,
            PATTERN: RegexConstants.NO_SYMBOLS,
            REQUIRED: false,
        },
        LAST_NAME: {
            MAX_LENGTH: 70,
            PATTERN: RegexConstants.NO_DIGITS_SYMBOLS_SPACES,
            REQUIRED: false,
        },
    },
    REPLY_MESSAGE_MODAL: {
        CONTENT: {
            MAX_LENGTH: 280,
            REQUIRED: true,
        },
    },
    SEND_MESSAGE_MODAL: {
        CONTENT: {
            MAX_LENGTH: 280,
            REQUIRED: true,
        },
    },
    SIGN_UP: {
        FORM: {
            CONFIRM_PASSWORD: {
                REQUIRED: true,
            },
            PASSWORD: {
                CONTAINS_DIGIT: RegexConstants.CONTAINS_DIGIT,
                CONTAINS_LOWERCASE: RegexConstants.CONTAINS_LOWERCASE,
                CONTAINS_SYMBOL: RegexConstants.CONTAINS_SYMBOL,
                CONTAINS_UPPERCASE: RegexConstants.CONTAINS_UPPERCASE,
                MAX_LENGTH: 30,
                MIN_LENGTH: 7,
                NO_SPACES: RegexConstants.NO_SPACES,
                REQUIRED: true,
            },
            USERNAME: {
                MAX_LENGTH: 70,
                PATTERN: RegexConstants.NO_SYMBOLS,
                REQUIRED: true,
            },
        },
    },
};
