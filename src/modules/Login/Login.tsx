import { useRouter } from "next/router";
import React from "react";
import { Button, Form, InputGroup, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import {
    type FieldErrors,
    type SubmitErrorHandler,
    type SubmitHandler,
    useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

import { ClientSideApi } from "@/@classes";
import type { ApiResponse } from "@/@types";
import { Endpoints, TextConstants } from "@/assets";
import LoginBackground from "@/assets/background/login/bg.gif";
import { renderTooltip } from "@/helpers";
import { useBackground, useLogger } from "@/hooks";

import styles from "./Login.module.css";

type LoginFormValues = {
    username: string;
    password: string;
};

const LOGIN_FORM_DEFAULT_VALUES: LoginFormValues = {
    password: "",
    username: "",
};

type LoginProperties = {
    numberOfUsersOnline?: number;
};

/**
 *
 * @returns
 */
export const Login = ({
    numberOfUsersOnline,
}: LoginProperties): JSX.Element => {
    const router = useRouter();
    const { ...loggerApi } = useLogger();

    useBackground(LoginBackground, {
        noOptions: true,
    });

    const { handleSubmit, register } = useForm<LoginFormValues>({
        criteriaMode: "all",
        defaultValues: LOGIN_FORM_DEFAULT_VALUES,
        mode: "all",
        reValidateMode: "onChange",
    });

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const onSubmit: SubmitHandler<LoginFormValues> = React.useCallback(
        async (data: LoginFormValues, _event: unknown) => {
            const request = toast.promise(
                ClientSideApi.post<ApiResponse<boolean>>(
                    `${Endpoints.USER.BASE}${Endpoints.USER.LOGIN}`,
                    data,
                ),
                {
                    error: "Login failed!",
                    pending: "Logging in...",
                    success: "Logged in successfully!",
                },
            );

            const loginResult = await request;

            const { data: isLoginSuccessful } = loginResult;

            if (isLoginSuccessful) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises -- disabled
                router.push("dashboard");
            }
        },
        [router],
    );

    const onError: SubmitErrorHandler<LoginFormValues> = React.useCallback(
        async (fieldErrors: FieldErrors<LoginFormValues>, _event: unknown) => {
            await loggerApi.logException(
                new Error(JSON.stringify(fieldErrors)),
            );
        },
        [loggerApi],
    );

    return (
        <div className={styles.login_layout}>
            <div>
                <Form
                    className={styles.login_form}
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    <Form.Group controlId="username">
                        <Form.Label>
                            {TextConstants.CONTENT.LOGIN.USERNAME_TITLE}
                        </Form.Label>
                        <Form.Control
                            placeholder={
                                TextConstants.CONTENT.LOGIN.USERNAME_PLACEHOLDER
                            }
                            type="text"
                            {...register("username")}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>
                            {TextConstants.CONTENT.LOGIN.PASSWORD_TITLE}
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                placeholder={
                                    TextConstants.CONTENT.LOGIN
                                        .PASSWORD_PLACEHOLDER
                                }
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                            />
                            <OverlayTrigger
                                overlay={(
                                    properties: OverlayInjectedProps,
                                ): JSX.Element =>
                                    renderTooltip(properties, {
                                        title: showPassword
                                            ? "Hide Password"
                                            : "Show Password",
                                    })
                                }
                                placement="right"
                            >
                                <Button
                                    onClick={(): void => {
                                        setShowPassword(
                                            (oldValue: boolean) => !oldValue,
                                        );
                                    }}
                                    variant={showPassword ? "dark" : "warning"}
                                >
                                    <i
                                        className={`fa-solid fa-${
                                            showPassword ? "eye-slash" : "eye"
                                        }`}
                                    />
                                </Button>
                            </OverlayTrigger>
                        </InputGroup>
                    </Form.Group>
                    <Button type="submit" variant="outline-warning">
                        {TextConstants.CONTENT.LOGIN.BUTTON_TEXT}
                    </Button>
                </Form>
            </div>
            <div className={styles.login_stats}>
                <div className={styles.login_page_stat}>
                    <span className={`${styles.login_users_online_dot}`}>
                        {"•"}
                    </span>
                    <div>
                        <span className={styles.login_users_online}>
                            {numberOfUsersOnline}
                        </span>
                        {
                            TextConstants.CONTENT.LOGIN
                                .NUMBER_OF_USERS_ONLINE_TEXT
                        }
                    </div>
                </div>
                <div className={styles.login_page_stat}>
                    <span className={`${styles.login_users_offline_dot}`}>
                        {"•"}
                    </span>
                    <div>
                        <span className={styles.login_users_online}>{"7"}</span>
                        {
                            TextConstants.CONTENT.LOGIN
                                .NUMBER_OF_USERS_OFFLINE_TEXT
                        }
                    </div>
                </div>
                <div className={styles.login_page_stat}>
                    <span className={styles.login_users_messages_icon}>
                        <i className="fa-solid fa-message fa-xs" />
                    </span>
                    <div>
                        <span className={styles.login_users_messages_count}>
                            {"11"}
                        </span>
                        <span className={styles.login_users_messages_sent_text}>
                            {
                                TextConstants.CONTENT.LOGIN
                                    .NUMBER_OF_MESSAGES_SENT
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
