/* eslint-disable ramda/prefer-ramda-boolean -- disabled */
/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
/* eslint-disable unicorn/no-null -- disabled just for useSwr, would rather use undefined */
/* eslint-disable @typescript-eslint/indent -- disabled */
import { useRouter } from "next/router";
import React, { type ChangeEvent } from "react";
import { Button, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";

import { ImageService, UserService } from "@/@classes";
import type { DashboardInformation } from "@/@types";
import { Endpoints } from "@/assets";
import Background from "@/assets/background/dashboard/bg.gif";
import placeholderPfp from "@/assets/placeholder/pfp.jpg";
import { useActiveStatus, useBackground, useNotifications } from "@/hooks";

import { AddUserModal } from "./AddUserModal";
import { ApplicationInfoModal } from "./ApplicationInfoModal";
import { ChatBox } from "./Chatbox";
import styles from "./Dashboard.module.css";
import { EditUserModal } from "./EditUserModal";
import { Friend } from "./Friend/Friend";
import { InboxOffcanvas } from "./InboxOffcanvas";
import { UserSettingsModal } from "./UserSettingsModal";

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
    useNotifications();
    useActiveStatus();
    const { mutate: globalMutate } = useSWRConfig();
    const { data, mutate, error, isLoading } = useSWR<
        DashboardInformation,
        Error,
        string
    >(`${Endpoints.USER.BASE}${Endpoints.USER.DASHBOARD}`, null, {
        refreshInterval: 2000,
    });

    const router = useRouter();
    const [hoveringOverProfilePicture, setHoveringOverProfilePicture] =
        React.useState<boolean>(false);
    const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
    const [showAddUserModal, setShowAddUserModal] =
        React.useState<boolean>(false);
    const [showUserSettingsModal, setShowUserSettingsModal] =
        React.useState<boolean>(false);
    const [showApplicationInfoModal, setShowApplicationInfoModal] =
        React.useState<boolean>(false);
    const [showUserInboxOffcanvas, setShowUserInboxOffcanvas] =
        React.useState<boolean>(false);

    const fileInputReference = React.createRef<HTMLInputElement>();

    const editModalOnClose = React.useCallback(() => {
        setShowEditModal(false);
    }, []);

    const addUserModalOnClose = React.useCallback(() => {
        setShowAddUserModal(false);
    }, []);

    const userSettingsModalOnClose = React.useCallback(() => {
        setShowUserSettingsModal(false);
    }, []);

    const applicationInfoModalOnClose = React.useCallback(() => {
        setShowApplicationInfoModal(false);
    }, []);

    const userInboxOffcanvasOnClose = React.useCallback(() => {
        setShowUserInboxOffcanvas(false);
    }, []);

    const refreshStateOnFocus = React.useCallback(async () => {
        await UserService.refreshState();
    }, []);

    const logout = React.useCallback(async () => {
        const loadingToast = toast.loading("Logging out...");
        const result = await UserService.logout();

        if (result.data) {
            toast.update(loadingToast, {
                autoClose: 500,
                isLoading: false,
                render: "Logout successful!",
                type: "success",
            });
            globalMutate(() => true, undefined, { revalidate: false });
            router.push("/login");
        } else {
            toast.update(loadingToast, {
                autoClose: 200,
                isLoading: false,
                render: "Failed to logout",
                type: "error",
            });
        }
    }, [globalMutate, router]);

    React.useEffect(() => {
        document.addEventListener("focus", refreshStateOnFocus);

        return () => {
            document.removeEventListener("focus", refreshStateOnFocus);
        };
    }, [refreshStateOnFocus]);

    if (error) {
        router.push("/login");
    }

    if (data === undefined || isLoading) {
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
                                src={data.profileImageUrl ?? placeholderPfp.src}
                            />
                            <div
                                className={styles.dashboard_user_pfp_upload}
                                onClick={(): void => {
                                    fileInputReference.current?.click();
                                }}
                                style={{
                                    backgroundColor: hoveringOverProfilePicture
                                        ? "rgba(0, 0, 0, 0.5)"
                                        : "transparent",
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
                            <Button
                                className={
                                    styles.dashboard_user_info_add_friend
                                }
                                onClick={(): void => {
                                    setShowAddUserModal(true);
                                }}
                                style={{
                                    opacity: hoveringOverProfilePicture ? 1 : 0,
                                    right: hoveringOverProfilePicture
                                        ? "-4vw"
                                        : "1vw",
                                    top: hoveringOverProfilePicture
                                        ? "-2vw"
                                        : "1vw",
                                }}
                                variant="success"
                            >
                                <i className="fa-solid fa-user-plus fa-sm" />
                            </Button>
                            <Button
                                className={styles.dashboard_user_info_inbox}
                                onClick={(): void => {
                                    setShowUserInboxOffcanvas(true);
                                }}
                                style={{
                                    bottom: hoveringOverProfilePicture
                                        ? "-2vw"
                                        : "1vw",
                                    opacity: hoveringOverProfilePicture ? 1 : 0,
                                    right: hoveringOverProfilePicture
                                        ? "-4vw"
                                        : "1vw",
                                }}
                                variant="warning"
                            >
                                <i className="fa-solid fa-inbox fa-sm" />
                            </Button>
                            <Button
                                className={styles.dashboard_user_logout}
                                onClick={async (): Promise<void> => {
                                    await logout();
                                }}
                                style={{
                                    opacity: hoveringOverProfilePicture ? 1 : 0,
                                    right: hoveringOverProfilePicture
                                        ? "6vw"
                                        : "1vw",
                                }}
                                variant="secondary"
                            >
                                <i className="fa-solid fa-right-from-bracket" />
                            </Button>
                            <Button
                                className={styles.dashboard_user_settings}
                                onClick={(): void => {
                                    setShowUserSettingsModal(true);
                                }}
                                style={{
                                    opacity: hoveringOverProfilePicture ? 1 : 0,
                                    right: hoveringOverProfilePicture
                                        ? "6vw"
                                        : "1vw",
                                    top: hoveringOverProfilePicture
                                        ? "-2vw"
                                        : "1vw",
                                }}
                                variant="light"
                            >
                                <i className="fa-solid fa-cog" />
                            </Button>
                            <Button
                                className={styles.dashboard_application_info}
                                onClick={(): void => {
                                    setShowApplicationInfoModal(true);
                                }}
                                style={{
                                    bottom: hoveringOverProfilePicture
                                        ? "-2vw"
                                        : "1vw",
                                    opacity: hoveringOverProfilePicture ? 1 : 0,
                                    right: hoveringOverProfilePicture
                                        ? "6vw"
                                        : "1vw",
                                }}
                                variant="info"
                            >
                                <i className="fa-solid fa-info" />
                            </Button>
                        </div>
                        <div className={styles.dashboard_user_info}>
                            <div className={styles.dashboard_user_handle}>
                                <span>
                                    {"@"}
                                    {data.handle ?? "N/A"}
                                </span>
                                {data.isEmailConfirmed ? (
                                    <i
                                        className={`fa-solid fa-circle-check ${styles.user_email_confirmed_icon}`}
                                    />
                                ) : (
                                    <i
                                        className={`fa-solid fa-triangle-exclamation ${styles.user_email_unconfirmed_icon}`}
                                    />
                                )}
                            </div>
                            <div className={styles.dashboard_user_username}>
                                {data.username}
                            </div>
                            <div
                                className={styles.dashboard_user_info_divider}
                            />
                            <div className={styles.dashboard_user_stats}>
                                <span>
                                    {`${data.numberOfFriends ?? 0} Friend${
                                        data.numberOfFriends === undefined
                                            ? ""
                                            : data.numberOfFriends === 1
                                            ? ""
                                            : "s"
                                    }`}
                                </span>
                                <span>
                                    {`${data.numberOfMessages} message${
                                        data.numberOfMessages === undefined
                                            ? ""
                                            : data.numberOfMessages === 1
                                            ? ""
                                            : "s"
                                    } sent`}
                                </span>
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
                                                                            await ImageService.uploadImage(
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
                                                                                await UserService.editUser(
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
                                                                            await mutate(
                                                                                {
                                                                                    ...data,
                                                                                    profileImageUrl:
                                                                                        uploadResponse
                                                                                            .data
                                                                                            .url,
                                                                                },
                                                                                {
                                                                                    optimisticData:
                                                                                        {
                                                                                            profileImageUrl:
                                                                                                uploadResponse
                                                                                                    .data
                                                                                                    .url,
                                                                                        },
                                                                                    revalidate:
                                                                                        false,
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
                                        {data.createdAt === undefined
                                            ? "N/A"
                                            : new Date(
                                                  data.createdAt,
                                              ).toDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.dashboard_top_bar_friends_list}>
                        {data.friendsInformation !== undefined &&
                        data.friendsInformation?.length > 0 ? (
                            data.friendsInformation?.map((eachFriend) => (
                                <Friend
                                    {...eachFriend}
                                    key={`friend ${eachFriend.username}`}
                                />
                            ))
                        ) : (
                            <div
                                className={styles.dashboard_no_friends_display}
                            >
                                <div
                                    className={
                                        styles.dashboard_no_friends_display_content
                                    }
                                >
                                    <div
                                        className={
                                            styles.dashboard_no_friends_display_title
                                        }
                                    >
                                        {"Add some friends!"}
                                    </div>
                                    <div
                                        className={
                                            styles.dashboard_no_friends_display_subtitle
                                        }
                                    >
                                        {"Use the green button"}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.dashboard_bottom_bar}>
                    <ChatBox
                        username={username as unknown as string}
                        usernameProfilePictureUrl={data.profileImageUrl}
                    />
                </div>
            </div>
            <EditUserModal
                editModalOnClose={editModalOnClose}
                mutateHandle={async (handleValue: string): Promise<void> => {
                    await mutate(
                        { ...data, handle: handleValue },
                        {
                            optimisticData: { handle: handleValue },
                            revalidate: false,
                        },
                    );
                }}
                showEditModal={showEditModal}
                username={username ?? ""}
            />
            <AddUserModal
                addUserModalOnClose={addUserModalOnClose}
                showAddUserModal={showAddUserModal}
                username={username ?? ""}
            />
            <UserSettingsModal
                showUserSettingsModal={showUserSettingsModal}
                userSettingsModalOnClose={userSettingsModalOnClose}
            />
            <InboxOffcanvas
                onClose={userInboxOffcanvasOnClose}
                showUserInboxOffcanvas={showUserInboxOffcanvas}
            />
            <ApplicationInfoModal
                onClose={applicationInfoModalOnClose}
                showApplicationInfoModal={showApplicationInfoModal}
            />
        </>
    );
};
