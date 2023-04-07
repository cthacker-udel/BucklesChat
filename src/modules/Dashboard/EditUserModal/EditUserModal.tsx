/* eslint-disable @typescript-eslint/indent -- disabled */

import React from "react";
import {
    Button,
    Form,
    InputGroup,
    Modal,
    OverlayTrigger,
} from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import type { User } from "@/@types";
import { renderTooltip } from "@/helpers";

import styles from "./EditUserModal.module.css";

type EditUserModalProperties = {
    editModalOnClose: () => void;
    showEditModal: boolean;
    username: string;
};

type FormValues = {
    dob: number;
    email: string;
    firstName: string;
    handle: string;
    lastName: string;
    username: string;
};

const FORM_DEFAULT_VALUES: Partial<User> = {
    dob: 0,
    email: "",
    firstName: "",
    handle: "",
    lastName: "",
    username: "",
};

/**
 * The modal that displays when the user clicks the pencil button that appears when the user profile
 * is hovered over
 *
 * @returns - The modal for editing the user
 */
export const EditUserModal = ({
    editModalOnClose,
    showEditModal,
    username,
}: EditUserModalProperties): JSX.Element => {
    const { data } = useSWR<Partial<User>, Partial<User>, string>(
        `user/details?username=${username}`,
    );

    const { register, reset, watch } = useForm<FormValues>({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        delayError: 250,
        mode: "all",
        reValidateMode: "onBlur",
    });

    const [lockUsername, setLockUsername] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (data !== undefined) {
            reset({ ...data });
        }
    }, [data, reset]);

    return (
        <Modal onHide={editModalOnClose} show={showEditModal}>
            <Modal.Header closeButton>
                <Modal.Title>{"Edit User"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="username_form">
                        <Form.Label>{"Username"}</Form.Label>
                        <InputGroup>
                            <Form.Control
                                className={styles.username_form}
                                readOnly={lockUsername}
                                style={{
                                    backgroundColor: lockUsername
                                        ? "rgba(0, 0, 0, .25)"
                                        : "",
                                }}
                                type="text"
                                {...register("username")}
                            />
                            <OverlayTrigger
                                overlay={(
                                    properties: OverlayInjectedProps,
                                ): JSX.Element =>
                                    renderTooltip(properties, {
                                        title: "Edit username",
                                    })
                                }
                                placement="right"
                            >
                                <Button
                                    onClick={(): void => {
                                        setLockUsername(
                                            (oldValue: boolean) => !oldValue,
                                        );
                                    }}
                                    variant={
                                        lockUsername
                                            ? "outline-danger"
                                            : "outline-success"
                                    }
                                >
                                    {lockUsername ? (
                                        <i className="fa-solid fa-lock" />
                                    ) : (
                                        <i className="fa-solid fa-unlock" />
                                    )}
                                </Button>
                            </OverlayTrigger>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>{"Modal footer"}</Modal.Footer>
        </Modal>
    );
};
