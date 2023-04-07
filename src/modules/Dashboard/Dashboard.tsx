import React from "react";
import { Image } from "react-bootstrap";

import Background from "@/assets/background/dashboard/bg.gif";
import placeholderPfp from "@/assets/placeholder/pfp.jpg";
import { useBackground } from "@/hooks";

import styles from "./Dashboard.module.css";
import { Friend } from "./Friend/Friend";

/**
 * Dashboard, which is the main hub for all of the features this application has to offer
 *
 * @returns The dashboard component, which houses all of the features of this application
 */
export const Dashboard = (): JSX.Element => {
    useBackground(Background, { noOptions: true });

    const friendsTemporaryData = Array.from({ length: 10 }).map((_, ind) => ({
        handle: `Handle ${ind + 1}`,
        profilePictureUrl: placeholderPfp.src,
        username: `Username ${ind + 1}`,
    }));

    return (
        <div className={styles.dashboard_layout}>
            <div className={styles.dashboard_top_bar}>
                <div className={styles.dashboard_top_bar_user_info}>
                    <Image
                        alt="The profile picture of the user"
                        className={styles.dashboard_user_info_pfp}
                        src={placeholderPfp.src}
                    />
                    <div className={styles.dashboard_user_info}>
                        <div className={styles.dashboard_user_handle}>
                            {"Handle"}
                        </div>
                        <div className={styles.dashboard_user_username}>
                            {"Username"}
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
