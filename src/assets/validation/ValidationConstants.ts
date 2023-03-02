export const ValidationConstants = {
    SIGN_UP: {
        FORM: {
            FIRST_NAME: {
                MAX_LENGTH: 70,
                PATTERN: /^[\w]+-{0,}[\w]{0,}$/gu,
                REQUIRED: true,
            },
            LAST_NAME: {
                MAX_LENGTH: 70,
                PATTERN: /^[\w]+-{0,}[\w]{0,}$/gu,
                REQUIRED: true,
            },
        },
    },
};
