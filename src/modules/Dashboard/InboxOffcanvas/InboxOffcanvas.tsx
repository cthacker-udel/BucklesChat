/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
import { useRouter } from "next/router";
import React from "react";
import { Accordion, Offcanvas } from "react-bootstrap";
import useSWR from "swr";

import type { FriendRequest } from "@/@types";
import { Endpoints } from "@/assets";

import styles from "./InboxOffcanvas.module.css";
import { PendingFriendRequest } from "./PendingFriendRequest";

type InboxOffCanvasProperties = {
    onClose: () => void;
    showUserInboxOffcanvas: boolean;
};

/**
 *
 * @param param0
 * @returns
 */
export const InboxOffcanvas = ({
    onClose,
    showUserInboxOffcanvas,
}: InboxOffCanvasProperties): JSX.Element => {
    const {
        data: pendingFriendRequests,
        error: pendingRequestsError,
        isLoading,
    } = useSWR<FriendRequest[], FriendRequest[], string>(
        `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.PENDING_REQUESTS}`,
        {
            refreshInterval: 350,
        },
    );

    const router = useRouter();

    const [scrolledToBottom, setScrolledToBottom] =
        React.useState<boolean>(true);

    if (pendingRequestsError !== undefined) {
        router.push("/login");
    }

    if (pendingFriendRequests === undefined || isLoading) {
        return <span />;
    }

    return (
        <Offcanvas
            className={styles.inbox_offcanvas_container}
            onHide={onClose}
            placement="end"
            scroll
            show={showUserInboxOffcanvas}
        >
            <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title className={styles.inbox_offcanvas_title}>
                    {"Inbox"}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Accordion
                    className={styles.inbox_offcanvas_accordion}
                    defaultActiveKey="0"
                    flush
                >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header
                            className={styles.inbox_offcanvas_accordion_header}
                        >
                            <div
                                className={
                                    styles.inbox_offcanvas_accordion_header_content
                                }
                            >
                                <span>{"Friend Requests"}</span>
                                {pendingFriendRequests !== undefined &&
                                    pendingFriendRequests.length > 0 && (
                                        <i
                                            className={`fa-solid fa-circle-exclamation ${styles.inbox_offcanvas_exclamation_circle}`}
                                        />
                                    )}
                            </div>
                        </Accordion.Header>
                        <Accordion.Body
                            className={styles.inbox_offcanvas_accordion_body}
                        >
                            {pendingFriendRequests === undefined ? (
                                <div>{"No Friend Requests"}</div>
                            ) : (
                                <div
                                    className={
                                        styles.inbox_offcanvas_accordion_container
                                    }
                                    onScroll={(
                                        event: React.UIEvent<HTMLDivElement>,
                                    ): void => {
                                        const { target } = event;
                                        const convertedElement =
                                            target as HTMLDivElement;
                                        setScrolledToBottom(
                                            convertedElement.scrollTop +
                                                convertedElement.offsetHeight >=
                                                convertedElement.scrollHeight,
                                        );
                                    }}
                                >
                                    {pendingFriendRequests.map(
                                        (eachFriendRequest) => (
                                            <PendingFriendRequest
                                                key={`friend_request_${eachFriendRequest.sender}`}
                                                {...eachFriendRequest}
                                            />
                                        ),
                                    )}
                                </div>
                            )}
                            {pendingFriendRequests.length > 0 && (
                                <div
                                    className={
                                        styles.inbox_offcanvas_container_scroll_helper
                                    }
                                    style={{
                                        opacity: scrolledToBottom
                                            ? "0%"
                                            : "50%",
                                        zIndex: scrolledToBottom ? "-1" : "0",
                                    }}
                                >
                                    <i className="fa-solid fa-arrow-down fa-xl" />
                                </div>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
