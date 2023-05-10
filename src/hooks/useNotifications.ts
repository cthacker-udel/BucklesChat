/* eslint-disable func-call-spacing -- disabled */
/* eslint-disable capitalized-comments -- disabled for now */
/* eslint-disable multiline-comment-style -- disabled for now */
/* eslint-disable unicorn/no-null -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */

import React from "react";
import { toast, type ToastItem } from "react-toastify";
import useSWR from "swr";

import { NotificationService } from "@/@classes";
import type { FetchedNotification, ToastNotificationData } from "@/@types";
import { Endpoints } from "@/assets";
import { processNotification } from "@/helpers";

/**
 * Fetches all notifications for the user and displays them accordingly
 */
export const useNotifications = (): void => {
    const { data: notifications, mutate } = useSWR<
        FetchedNotification[],
        Error,
        string
    >(
        `${Endpoints.NOTIFICATION.BASE}${Endpoints.NOTIFICATION.ALL_NOTIFICATIONS}`,
        null,
        { refreshInterval: 5000 },
    );

    React.useEffect(() => {
        const unsubscribe = toast.onChange(async (payload: ToastItem) => {
            const { data, status } = payload;
            const { notificationId } = data as ToastNotificationData;
            if (status === "added") {
                await NotificationService.removeNotification(notificationId);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    React.useEffect(() => {
        if (notifications !== undefined && notifications.length > 0) {
            for (const eachNotification of notifications) {
                toast.info<string>(processNotification(eachNotification), {
                    autoClose: 1500,
                    data: {
                        notificationId: eachNotification.id,
                    },
                    draggable: false,
                    pauseOnFocusLoss: false,
                    pauseOnHover: false,
                });
            }
        }
    }, [mutate, notifications]);
};
