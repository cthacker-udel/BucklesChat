import { useBackground } from "@/hooks/useBackground";
import React from "react";
import Background from "@/assets/background/signup/bg.gif";

import styles from "./SignUp.module.css";
import { TextConstants } from "@/assets/str/TextConstants";
import { Form, OverlayTrigger } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ValidationConstants } from "@/assets/validation/ValidationConstants";
import { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { renderTooltip } from "@/helpers";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  handle: string;
  dob: number;
  password: string;
  confirmPassword: string;
};

const FORM_DEFAULT_VALUES: FormValues = {
  confirmPassword: "",
  dob: Date.now(),
  email: "",
  firstName: "",
  handle: "",
  lastName: "",
  password: "",
  username: "",
};

/**
 *
 * @returns
 */
export const SignUp = (): JSX.Element => {
  useBackground(Background);

  const { formState, register } = useForm<FormValues>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: FORM_DEFAULT_VALUES,
    criteriaMode: "all",
  });

  const { errors, dirtyFields, isValid } = formState;

  console.log(errors, isValid);

  return (
    <div className={styles.sign_up_content}>
      <div className={styles.sign_up_header}>
        {TextConstants.CONTENT.SIGN_UP.TITLE}
        <OverlayTrigger
          overlay={(properties: OverlayInjectedProps): JSX.Element =>
            renderTooltip(properties, { title: "Back to Home Page" })
          }
          placement="top"
        >
          <i
            className={`fa-solid fa-circle-arrow-left ${styles.sign_up_back_button}`}
          />
        </OverlayTrigger>
      </div>
      <Form>
        <Form.Group controlId="first_name_form">
          <Form.Label>{TextConstants.CONTENT.SIGN_UP.FORM_1_LABEL}</Form.Label>
          <Form.Control
            isInvalid={
              Boolean(dirtyFields.firstName) && Boolean(errors.firstName)
            }
            isValid={
              Boolean(dirtyFields.firstName) && !Boolean(errors.firstName)
            }
            placeholder={TextConstants.CONTENT.SIGN_UP.FORM_1_PLACEHOLDER}
            type="text"
            {...register("firstName", {
              required: {
                message:
                  TextConstants.VALIDATION.INVALID.SIGN_UP.FORM_1.REQUIRED,
                value: ValidationConstants.SIGN_UP.FORM_1.FIRST_NAME.REQUIRED,
              },
              maxLength: {
                message:
                  TextConstants.VALIDATION.INVALID.SIGN_UP.FORM_1.MAX_LENGTH,
                value: ValidationConstants.SIGN_UP.FORM_1.FIRST_NAME.MAX_LENGTH,
              },
              pattern: {
                message:
                  TextConstants.VALIDATION.INVALID.SIGN_UP.FORM_1.PATTERN,
                value: ValidationConstants.SIGN_UP.FORM_1.FIRST_NAME.PATTERN,
              },
            })}
          />
          {errors.firstName !== undefined && (
            <Form.Control.Feedback type="invalid">
              {errors.firstName.message}
            </Form.Control.Feedback>
          )}
          {errors.firstName === undefined && dirtyFields.firstName && (
            <Form.Control.Feedback type="valid">
              {TextConstants.VALIDATION.VALID.SIGN_UP.FORM_1}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Form>
    </div>
  );
};
