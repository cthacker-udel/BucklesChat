import React from "react";
import { Nav, OverlayTrigger, Tab, TabContainer } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import { renderTooltip } from "@/helpers";

import styles from "./ChatBox.module.css";
import { Threads } from "./Threads";

type ChatBoxProperties = {
    username: string;
};

/**
 *
 */
export const ChatBox = ({ username }: ChatBoxProperties): JSX.Element => (
    <div className={styles.chatbox_tabs_content}>
        <TabContainer defaultActiveKey="threads" id="chatbox_tabs">
            <Nav className={styles.chatbox_tabs_categories} variant="pills">
                <Nav.Item>
                    <OverlayTrigger
                        overlay={(
                            properties: OverlayInjectedProps,
                        ): JSX.Element =>
                            renderTooltip(properties, { title: "Threads" })
                        }
                        placement="left"
                    >
                        <Nav.Link eventKey="threads">
                            <i className="fa-solid fa-tape" />
                        </Nav.Link>
                    </OverlayTrigger>
                </Nav.Item>
                <Nav.Item>
                    <OverlayTrigger
                        overlay={(
                            properties: OverlayInjectedProps,
                        ): JSX.Element =>
                            renderTooltip(properties, { title: "Chats" })
                        }
                        placement="left"
                    >
                        <Nav.Link eventKey="chats">
                            <i className="fa-solid fa-comments" />
                        </Nav.Link>
                    </OverlayTrigger>
                </Nav.Item>
            </Nav>
            <Tab.Content className={styles.thread_tab}>
                <Tab.Pane className={styles.thread_tab_pane} eventKey="threads">
                    <Threads username={username} />
                </Tab.Pane>
                <Tab.Pane eventKey="chats">{"Chats"}</Tab.Pane>
            </Tab.Content>
        </TabContainer>
    </div>
);
