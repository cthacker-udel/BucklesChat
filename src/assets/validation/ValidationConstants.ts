import { RegexConstants } from "../regex";

export const ValidationConstants = {
    SIGN_UP: {
        FORM: {
            EMAIL: {
                MAX_LENGTH: 120,
                REQUIRED: true,
            },
            FIRST_NAME: {
                MAX_LENGTH: 70,
                PATTERN: RegexConstants.NO_DIGITS_SYMBOLS_SPACES,
                REQUIRED: true,
            },
            HANDLE: {
                MAX_LENGTH: 12,
                PATTERN: RegexConstants.NO_SYMBOLS,
                REQUIRED: true,
            },
            LAST_NAME: {
                MAX_LENGTH: 70,
                PATTERN: RegexConstants.NO_DIGITS_SYMBOLS_SPACES,
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
