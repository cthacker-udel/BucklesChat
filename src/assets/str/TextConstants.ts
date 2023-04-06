import { ValidationConstants } from "../validation/ValidationConstants";

export const TextConstants = {
    CONTENT: {
        HOME_PAGE: {
            BUTTON_1_TEXT: "Sign Up",
            BUTTON_2_TEXT: "Log In",
            DESCRIPTION:
                "This is a chat application that allows for users to chat with each other. Have a good time! You can make however many accounts you want, and even sign up with the same emails (although the new account will replace the old one). The more messages you send, the higher your reputation grows, and messages can be up-voted and down-voted as well, which affects your reputation also.",
            TITLE: "Welcome to Buckles Chat!",
        },
        LOGIN: {
            BUTTON_TEXT: "Login",
            NUMBER_OF_MESSAGES_SENT: "messages",
            NUMBER_OF_USERS: "users",
            NUMBER_OF_USERS_ONLINE_TEXT: "online",
            PASSWORD_PLACEHOLDER: "Enter your password",
            PASSWORD_TITLE: "Password",
            USERNAME_PLACEHOLDER: "Enter your username",
            USERNAME_TITLE: "Username",
        },
        SIGN_UP: {
            CONFIRM_PASSWORD_LABEL: "Confirm Password",
            CONFIRM_PASSWORD_PLACEHOLDER: "Type the same password again",
            DATE_OF_BIRTH_LABEL: "Date of Birth",
            DATE_OF_BIRTH_PLACEHOLDER: "Enter your date of birth",
            EMAIL_LABEL: "Email",
            EMAIL_PLACEHOLDER: "Enter your email",
            FIRST_NAME_LABEL: "First Name",
            FIRST_NAME_PLACEHOLDER: "Enter your first name",
            FORM_SUBMIT_BUTTON_TEXT: "Submit",
            HANDLE_LABEL: "Handle",
            HANDLE_PLACEHOLDER: "Enter your handle",
            LAST_NAME_LABEL: "Last Name",
            LAST_NAME_PLACEHOLDER: "Enter your last name",
            PASSWORD_LABEL: "Password",
            PASSWORD_PLACEHOLDER: "Enter your password",
            TITLE: "Sign Up",
            USERNAME_LABEL: "Username",
            USERNAME_PLACEHOLDER: "Enter your username",
        },
    },
    VALIDATION: {
        INVALID: {
            SIGN_UP: {
                CONFIRM_PASSWORD: {
                    MATCHING: "Passwords must match",
                    REQUIRED: "Confirmed Password is required",
                },
                DATE_OF_BIRTH: {
                    REQUIRED: "Date of Birth is required",
                },
                EMAIL: {
                    MAX_LENGTH: `Email cannot be more then ${ValidationConstants.SIGN_UP.FORM.EMAIL.MAX_LENGTH} characters`,
                    PATTERN: "Email is invalid",
                    REQUIRED: "Email is required",
                },
                FIRST_NAME: {
                    MAX_LENGTH: `First Name cannot be more then ${ValidationConstants.SIGN_UP.FORM.FIRST_NAME.MAX_LENGTH} characters`,
                    PATTERN:
                        "First Name cannot contain digits, underscores, or any space characters",
                    REQUIRED: "First Name is required",
                },
                HANDLE: {
                    MAX_LENGTH: `Handle cannot be more than ${ValidationConstants.SIGN_UP.FORM.HANDLE.MAX_LENGTH} characters`,
                    PATTERN: "Handle cannot contain any symbols",
                    REQUIRED: "Handle is required",
                },
                LAST_NAME: {
                    MAX_LENGTH: `Last Name cannot be more then ${ValidationConstants.SIGN_UP.FORM.LAST_NAME.MAX_LENGTH} characters`,
                    PATTERN:
                        "Last Name cannot contain digits, underscores, or any space characters",
                    REQUIRED: "Last Name is required",
                },
                PASSWORD: {
                    CONTAINS_DIGIT: "Password must contain at least 1 digit",
                    CONTAINS_LOWERCASE:
                        "Password must contain at least 1 lowercase letter",
                    CONTAINS_SYMBOL: "Password must contain at least 1 symbol",
                    CONTAINS_UPPERCASE:
                        "Password must contain at least 1 uppercase letter",
                    MATCHING: "Passwords must match",
                    MAX_LENGTH: `Password must be at most ${ValidationConstants.SIGN_UP.FORM.PASSWORD.MAX_LENGTH} characters`,
                    MIN_LENGTH: `Password must be at least ${ValidationConstants.SIGN_UP.FORM.PASSWORD.MIN_LENGTH} characters`,
                    NO_SPACES: "Password cannot contain any spaces",
                    REQUIRED: "Password is required",
                },
                USERNAME: {
                    MAX_LENGTH: `Username cannot be more then ${ValidationConstants.SIGN_UP.FORM.USERNAME.MAX_LENGTH} characters`,
                    PATTERN: "Username cannot contain any symbols",
                    REQUIRED: "Username is required",
                },
            },
        },
        VALID: {
            SIGN_UP: {
                CONFIRM_PASSWORD: "Passwords match!",
                DATE_OF_BIRTH: "Date of Birth is valid!",
                EMAIL: "Email is valid!",
                FIRST_NAME: "First Name is valid!",
                HANDLE: "Handle is valid!",
                LAST_NAME: "Last Name is valid!",
                PASSWORD: "Password is valid!",
                USERNAME: "Username is valid!",
            },
        },
    },
};
