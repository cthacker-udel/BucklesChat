/* eslint-disable unicorn/no-null -- disabled */
/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import { UserService } from "@/@classes";
import type { ActiveStatus } from "@/@types";
import { ActiveStatusType, Endpoints } from "@/assets";

/**
 * Hook used for updating the user state (logged in, away, logged out) and also checking the expiration time of the user state
 */
export const useActiveStatus = (): void => {
    const router = useRouter();
    useSWR<ActiveStatus, Error, string>(
        `${Endpoints.USER.BASE}${Endpoints.USER.PING_STATE_EXPIRATION}`,
        null,
        {
            errorRetryCount: 5,
            onError: () => {
                router.push("/login");
            },
            onSuccess: async (currentStatus: ActiveStatus) => {
                const { status } = currentStatus;
                if (status === ActiveStatusType.OFFLINE) {
                    await UserService.logout();
                    router.push("/login");
                }
            },
            refreshInterval: 10_000,
        },
    );

    const unloadEffect = React.useCallback(async () => {
        await UserService.clearState();
        await UserService.logout();
    }, []);

    React.useEffect(() => {
        window.addEventListener("beforeunload", unloadEffect);

        return () => {
            window.removeEventListener("beforeunload", unloadEffect);
        };
    }, [unloadEffect]);
};
