import React from "react";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import Background from "@/assets/background/dashboard/bg.gif";
import placeholderPfp from "@/assets/placeholder/pfp.jpg";
import { renderTooltip } from "@/helpers";
import { useBackground } from "@/hooks";

import styles from "./Dashboard.module.css";
import { Friend } from "./Friend/Friend";

type DashboardProperties = {
    handle?: string;
    profilePictureUrl?: string;
    username?: string;
};

/**
 * Dashboard, which is the main hub for all of the features this application has to offer
 *
 * @returns The dashboard component, which houses all of the features of this application
 */
export const Dashboard = ({
    handle,
    profilePictureUrl,
    username,
}: DashboardProperties): JSX.Element => {
    useBackground(Background, { noOptions: true });

    const [hoveringOverProfilePicture, setHoveringOverProfilePicture] =
        React.useState<boolean>(false);

    const friendsTemporaryData = Array.from({ length: 10 }).map((_, ind) => ({
        handle: `Handle ${ind + 1}`,
        profilePictureUrl: placeholderPfp.src,
        username: `Username ${ind + 1}`,
    }));

    return (
        <div className={styles.dashboard_layout}>
            <div className={styles.dashboard_top_bar}>
                <div className={styles.dashboard_top_bar_user_info}>
                    <div
                        className={styles.dashboard_top_bar_user_pfp_container}
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
                            src={placeholderPfp.src}
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
                            <div className={styles.dashboard_user_pfp_upload}>
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
                    </div>
                    <div className={styles.dashboard_user_info}>
                        <div className={styles.dashboard_user_handle}>
                            {"Handle"}
                        </div>
                        <div className={styles.dashboard_user_username}>
                            {username}
                        </div>
                        <div className={styles.dashboard_user_info_divider} />
                        <div className={styles.dashboard_user_stats}>
                            <span>{"10 Friends"}</span>
                            <span>{"10 messages sent"}</span>
                            <div className={styles.dashboard_member_since}>
                                <span
                                    className={
                                        styles.dashboard_member_since_title
                                    }
                                >
                                    {"Member Since"}
                                </span>
                                <span
                                    className={
                                        styles.dashboard_member_since_date
                                    }
                                >
                                    {"Aug 10 2021"}
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
    );
};