/* eslint-disable unicorn/no-null -- disabled */
/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
import { useRouter } from "next/router";
import useSWR from "swr";

import { UserService } from "@/@classes";
import type { _useActiveStatus, ActiveStatus } from "@/@types";
import { ActiveStatusType, Endpoints } from "@/assets";

/**
 * Hook used for updating the user state (logged in, away, logged out) and also checking the expiration time of the user state
 */
export const useActiveStatus: _useActiveStatus = (): void => {
    const router = useRouter();
    useSWR<boolean, Error, string>(
        `${Endpoints.USER.BASE}${Endpoints.USER.REFRESH_USER_STATE}`,
        null,
        {
            fallbackData: true,
            refreshInterval: 50_000,
            refreshWhenHidden: false,
            refreshWhenOffline: false,
        },
    );
    useSWR<ActiveStatus, Error, string>(
        `${Endpoints.USER.BASE}${Endpoints.USER.PING_STATE_EXPIRATION}`,
        null,
        {
            errorRetryCount: 5,
            fallbackData: {
                status: ActiveStatusType.ONLINE,
                timeLeft: 1,
            },
            onError: () => {
                router.push("/login");
            },
            onSuccess: async (currentStatus: ActiveStatus) => {
                if (currentStatus === undefined) {
                    await UserService.logout();
                    router.push("/login");
                } else {
                    const { status } = currentStatus;
                    if (status === ActiveStatusType.OFFLINE) {
                        await UserService.logout();
                        router.push("/login");
                    }
                }
            },
            refreshInterval: 10_000,
            refreshWhenHidden: true,
            revalidateOnFocus: true,
            revalidateOnMount: true,
        },
    );
};
