/* eslint-disable unicorn/no-null -- disabled just for useSwr, would rather use undefined */
/* eslint-disable @typescript-eslint/indent -- disabled */
import React, { type ChangeEvent } from "react";
import { Button, Image, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { toast } from "react-toastify";
import useSWR from "swr";

import { ImageApi } from "@/@classes/api/client/Image";
import { ClientUserApi } from "@/@classes/api/client/User";
import type { DashboardInformation } from "@/@types";
import Background from "@/assets/background/dashboard/bg.gif";
import placeholderPfp from "@/assets/placeholder/pfp.jpg";
import { renderTooltip } from "@/helpers";
import { useBackground } from "@/hooks";

import styles from "./Dashboard.module.css";
import { EditUserModal } from "./EditUserModal";
import { Friend } from "./Friend/Friend";

type DashboardProperties = {
    username?: string;
};

/**
 * Dashboard, which is the main hub for all of the features this application has to offer
 *
 * @returns The dashboard component, which houses all of the features of this application
 */
export const Dashboard = ({ username }: DashboardProperties): JSX.Element => {
    useBackground(Background, { noOptions: true });
    const { data } = useSWR<DashboardInformation, DashboardInformation, string>(
        `user/dashboard?username=${username}`,
        null,
        { refreshInterval: 5000 },
    );

    const [hoveringOverProfilePicture, setHoveringOverProfilePicture] =
        React.useState<boolean>(false);
    const [showEditModal, setShowEditModal] = React.useState<boolean>(false);

    const fileInputReference = React.createRef<HTMLInputElement>();

    const editModalOnClose = React.useCallback(() => {
        setShowEditModal(false);
    }, []);

    const friendsTemporaryData = Array.from({ length: 10 }).map((_, ind) => ({
        handle: `Handle ${ind + 1}`,
        profilePictureUrl: placeholderPfp.src,
        username: `Username ${ind + 1}`,
    }));

    if (data === undefined) {
        return <span />;
    }

    return (
        <>
            <div className={styles.dashboard_layout}>
                <div className={styles.dashboard_top_bar}>
                    <div className={styles.dashboard_top_bar_user_info}>
                        <div
                            className={
                                styles.dashboard_top_bar_user_pfp_container
                            }
                            onMouseLeave={(): void => {
                                setHoveringOverProfilePicture(false);
                            }}
                            onMouseOver={(): void => {
                                setHoveringOverProfilePicture(true);
                            }}
                        >
                            <Image
                                alt="The profile picture of the user"
                                className={styles.dashboard_user_info_pfp}
                                src={
                                    data.profile_image_url ?? placeholderPfp.src
                                }
                            />
                            <OverlayTrigger
                                delay={{ hide: 250, show: 250 }}
                                overlay={(
                                    overlayProperties: OverlayInjectedProps,
                                ): JSX.Element =>
                                    renderTooltip(overlayProperties, {
                                        title: "Upload Profile Picture",
                                        titleClassNameOverride:
                                            styles.dashboard_user_pfp_tooltip_title,
                                    })
                                }
                                placement="top"
                            >
                                <div
                                    className={styles.dashboard_user_pfp_upload}
                                    onClick={(): void => {
                                        fileInputReference.current?.click();
                                    }}
                                >
                                    <i
                                        className="fa-solid fa-cloud-arrow-up"
                                        style={{
                                            opacity: hoveringOverProfilePicture
                                                ? 1
                                                : 0,
                                        }}
                                    />
                                </div>
                            </OverlayTrigger>
                            <Button
                                className={styles.dashboard_user_info_edit_user}
                                onClick={(): void => {
                                    setShowEditModal(true);
                                }}
                                style={{
                                    opacity: hoveringOverProfilePicture ? 1 : 0,
                                    right: hoveringOverProfilePicture
                                        ? "-4vw"
                                        : "1vw",
                                }}
                                variant="primary"
                            >
                                <i className="fa-solid fa-pencil fa-sm" />
                            </Button>
                        </div>
                        <div className={styles.dashboard_user_info}>
                            <div className={styles.dashboard_user_handle}>
                                {data.handle ?? "N/A"}
                            </div>
                            <div className={styles.dashboard_user_username}>
                                {data.username}
                            </div>
                            <div
                                className={styles.dashboard_user_info_divider}
                            />
                            <div className={styles.dashboard_user_stats}>
                                <span>{"10 Friends"}</span>
                                <span>{"10 messages sent"}</span>
                                <div className={styles.dashboard_member_since}>
                                    <span
                                        className={
                                            styles.dashboard_member_since_title
                                        }
                                    >
                                        <input
                                            accept="image/*"
                                            className={
                                                styles.hidden_file_import
                                            }
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>,
                                            ): void => {
                                                const { target } = event;
                                                if (target !== undefined) {
                                                    const { files } = target;
                                                    if (files) {
                                                        const uploadedFile =
                                                            files.item(0);
                                                        if (uploadedFile) {
                                                            const fileReader =
                                                                new FileReader();
                                                            fileReader.addEventListener(
                                                                "load",
                                                                async () => {
                                                                    const sourceData =
                                                                        fileReader.result;
                                                                    if (
                                                                        sourceData !==
                                                                        null
                                                                    ) {
                                                                        const base64String =
                                                                            (
                                                                                sourceData as string
                                                                            ).split(
                                                                                "base64,",
                                                                            )[1];
                                                                        const loadingUpload =
                                                                            toast.loading(
                                                                                "Uploading image...",
                                                                            );
                                                                        const uploadResponse =
                                                                            await ImageApi.uploadImage(
                                                                                base64String,
                                                                                `${username}_profile_picture`,
                                                                            );
                                                                        toast.dismiss(
                                                                            loadingUpload,
                                                                        );

                                                                        if (
                                                                            uploadResponse?.success
                                                                        ) {
                                                                            const profilePictureSetResponse =
                                                                                await ClientUserApi.editUser(
                                                                                    {
                                                                                        profileImageRemovalUrl:
                                                                                            uploadResponse
                                                                                                .data
                                                                                                .delete_url,
                                                                                        profileImageUrl:
                                                                                            uploadResponse
                                                                                                .data
                                                                                                .url,
                                                                                        username,
                                                                                    },
                                                                                );
                                                                            const {
                                                                                data: result,
                                                                            } =
                                                                                profilePictureSetResponse;

                                                                            if (
                                                                                result
                                                                            ) {
                                                                                toast.success(
                                                                                    "Uploaded profile picture successfully!",
                                                                                );
                                                                            } else {
                                                                                toast.error(
                                                                                    "Failed to upload profile picture",
                                                                                );
                                                                            }
                                                                        } else {
                                                                            toast.error(
                                                                                "Failed to upload profile picture.",
                                                                            );
                                                                        }
                                                                    }
                                                                },
                                                            );
                                                            fileReader.readAsDataURL(
                                                                uploadedFile,
                                                            );
                                                        }
                                                    }
                                                }
                                            }}
                                            ref={fileInputReference}
                                            type="file"
                                        />
                                        {"Member Since"}
                                    </span>
                                    <span
                                        className={
                                            styles.dashboard_member_since_date
                                        }
                                    >
                                        {data.creation_date === undefined
                                            ? "N/A"
                                            : new Date(
                                                  Number(data.creation_date),
                                              ).toDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.dashboard_top_bar_friends_list}>
                        {friendsTemporaryData.map((eachFriend) => (
                            <Friend
                                {...eachFriend}
                                key={`friend ${eachFriend.username}`}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.dashboard_bottom_bar}>
                    <div className={styles.dashboard_bottom_bar_chat_box}>
                        {"Chat Box"}
                    </div>
                </div>
            </div>
            <EditUserModal
                editModalOnClose={editModalOnClose}
                showEditModal={showEditModal}
                username={username ?? ""}
            />
        </>
    );
};
