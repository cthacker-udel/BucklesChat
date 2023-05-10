/* eslint-disable unicorn/no-null -- disabled */
/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
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
import useSWR from "swr";

import { ClientSideApi } from "@/@classes";
import type { ApiResponse, LoginDiagnostics, LoginResponse } from "@/@types";
import { Endpoints, TextConstants } from "@/assets";
import LoginBackground from "@/assets/background/login/bg.gif";
import { numericalConverter, renderTooltip } from "@/helpers";
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
    numberOfUsers?: number;
};

/**
 * The login page, where the user attempts to login into their account
 *
 * @returns The login page, which handles throttling, and signing the user in, setting cookies, etc
 */
export const Login = ({
    numberOfUsersOnline,
    numberOfUsers,
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

    const { data: loginDiagnostics } = useSWR<LoginDiagnostics, Error, string>(
        `${Endpoints.USER.BASE}${Endpoints.USER.LOGIN_DIAGNOSTICS}`,
        null,
        {
            refreshInterval: 5000,
        },
    );

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const onSubmit: SubmitHandler<LoginFormValues> = React.useCallback(
        async (data: LoginFormValues, _event: unknown) => {
            const request = toast.promise(
                ClientSideApi.post<ApiResponse<LoginResponse>>(
                    `${Endpoints.USER.BASE}${Endpoints.USER.LOGIN}`,
                    data,
                ),
                { pending: "Logging in..." },
            );

            const loginResult = await request;

            const {
                data: { loggedIn, lockedUntil },
            } = loginResult;

            if (lockedUntil > 0) {
                if (lockedUntil > 6000) {
                    const minutes = numericalConverter.milliseconds.toMinutes(
                        lockedUntil - Date.now(),
                        1,
                    );
                    toast.error(`Wait ${minutes} minutes to log in.`);
                } else {
                    const seconds = numericalConverter.milliseconds.toSeconds(
                        lockedUntil - Date.now(),
                        1,
                    );
                    toast.error(`Wait ${seconds} seconds to log in.`);
                }
            } else if (loggedIn) {
                toast.success("Login was a success!");
                router.push("dashboard");
            } else {
                toast.error("Login failed!");
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
                            {loginDiagnostics?.totalOnline ??
                                numberOfUsersOnline}
                        </span>
                        {
                            TextConstants.CONTENT.LOGIN
                                .NUMBER_OF_USERS_ONLINE_TEXT
                        }
                    </div>
                </div>
                <div className={styles.login_page_stat}>
                    <span className={styles.login_total_users_icon}>
                        <i className="fa-solid fa-user fa-xs" />
                    </span>
                    <div>
                        <span className={styles.login_users_online}>
                            {loginDiagnostics?.totalUsers ?? numberOfUsers}
                        </span>
                        {TextConstants.CONTENT.LOGIN.NUMBER_OF_USERS}
                    </div>
                </div>
                <div className={styles.login_page_stat}>
                    <span className={styles.login_users_messages_icon}>
                        <i className="fa-solid fa-message fa-xs" />
                    </span>
                    <div>
                        <span className={styles.login_users_messages_count}>
                            {loginDiagnostics?.totalMessages ?? 0}
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
