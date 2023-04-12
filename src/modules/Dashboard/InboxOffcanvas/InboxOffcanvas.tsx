/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import { Accordion, Button, Image, Offcanvas } from "react-bootstrap";
import useSWR from "swr";

import type { FriendRequest } from "@/@types";
import placeHolderPfp from "@/assets/placeholder/pfp.jpg";
import { computeTodayDayDistance } from "@/helpers";

import styles from "./InboxOffcanvas.module.css";

type InboxOffCanvasProperties = {
    onClose: () => void;
    showUserInboxOffcanvas: boolean;
    username: string;
};

/**
 *
 * @param param0
 * @returns
 */
export const InboxOffcanvas = ({
    onClose,
    showUserInboxOffcanvas,
    username,
}: InboxOffCanvasProperties): JSX.Element => {
    const { data: pendingFriendRequests } = useSWR<
        FriendRequest[],
        FriendRequest[],
        string
    >(`friend/pendingRequests?username=${username}`);

    console.log(pendingFriendRequests);

    return (
        <Offcanvas
            className={styles.inbox_offcanvas_container}
            onHide={onClose}
            placement="end"
            scroll
            show={showUserInboxOffcanvas}
        >
            <Offcanvas.Header
                className={styles.inbox_offcanvas_header}
                closeButton
                closeVariant="white"
            >
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
                        <Accordion.Body>
                            {pendingFriendRequests === undefined ? (
                                <div>{"No Friend Requests"}</div>
                            ) : (
                                <div
                                    className={styles.friend_request_container}
                                >
                                    {pendingFriendRequests.map(
                                        (eachFriendRequest) => (
                                            <div
                                                className={
                                                    styles.friend_request_item
                                                }
                                                key={`friend_request_${eachFriendRequest.sender}`}
                                            >
                                                <div
                                                    className={
                                                        styles.friend_request_info_container
                                                    }
                                                >
                                                    <Image
                                                        alt={`${eachFriendRequest.sender}'s profile picture`}
                                                        className={
                                                            styles.friend_request_pfp
                                                        }
                                                        src={
                                                            eachFriendRequest.senderProfileImageUrl ??
                                                            placeHolderPfp.src
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            styles.friend_request_info
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.friend_request_username
                                                            }
                                                        >
                                                            {
                                                                eachFriendRequest.sender
                                                            }
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.friend_request_sent_time
                                                            }
                                                        >
                                                            {`${computeTodayDayDistance(
                                                                new Date(
                                                                    eachFriendRequest.createdAt,
                                                                ),
                                                            )}d ago`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.friend_request_actions
                                                    }
                                                >
                                                    <Button
                                                        className={
                                                            styles.friend_request_action
                                                        }
                                                        onClick={(): void => {
                                                            console.log(
                                                                "accept friend request here",
                                                            );
                                                        }}
                                                        variant="outline-success"
                                                    >
                                                        <i className="fa-solid fa-check fa-xs" />
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.friend_request_action
                                                        }
                                                        onClick={(): void => {
                                                            console.log(
                                                                "reject friend request here",
                                                            );
                                                        }}
                                                        variant="outline-danger"
                                                    >
                                                        <i className="fa-solid fa-xmark fa-xs" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
