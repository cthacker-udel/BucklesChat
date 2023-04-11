import React from "react";
import { Offcanvas } from "react-bootstrap";

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
}: InboxOffCanvasProperties): JSX.Element => (
    <Offcanvas
        onHide={onClose}
        placement="end"
        scroll
        show={showUserInboxOffcanvas}
    >
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>{"Hello"}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{"This is the body"}</Offcanvas.Body>
    </Offcanvas>
);
