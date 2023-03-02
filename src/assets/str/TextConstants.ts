import { ValidationConstants } from "../validation/ValidationConstants";

export const TextConstants = {
  CONTENT: {
    HOME_PAGE: {
      BUTTON_1_TEXT: "Sign Up",
      BUTTON_2_TEXT: "Log In",
      TITLE: "Welcome to Buckles Chat!",
      DESCRIPTION:
        "This is a chat application that allows for users to chat with each other. Have a good time! You can make however many accounts you want, and even sign up with the same emails (although the new account will replace the old one). The more messages you send, the higher your reputation grows, and messages can be up-voted and down-voted as well, which affects your reputation also.",
    },
    SIGN_UP: {
      TITLE: "Sign Up",
      FORM_1_LABEL: "First Name",
      FORM_1_PLACEHOLDER: "Enter your first name",
    },
  },
  VALIDATION: {
    INVALID: {
      SIGN_UP: {
        FORM_1: {
          REQUIRED: "First Name is required",
          MAX_LENGTH: `First Name cannot be more then ${ValidationConstants.SIGN_UP.FORM_1.FIRST_NAME.MAX_LENGTH} characters`,
          PATTERN:
            "First name cannot contain digits, underscores, or any space characters",
        },
      },
    },
    VALID: {
      SIGN_UP: {
        FORM_1: "First Name is valid!",
      },
    },
  },
};
