/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { UserService } from "@/@classes";
import { Endpoints } from "@/assets";

/**
 * Hook used for updating the user state (logged in, away, logged out) and also checking the expiration time of the user state
 */
export const useState = (): void => {
    const router = useRouter();
    const {
        data: stateExpiration,
        error,
        isLoading,
        isValidating,
    } = useSWR<number, Error, string>(
        `${Endpoints.USER.BASE}${Endpoints.USER.PING_STATE_EXPIRATION}`,
    );

    const unloadEffect = React.useCallback(async () => {
        const { data: removedState } = await UserService.clearState();

        if (removedState) {
            toast.success(
                "Successfully removed state! (now update in database)",
            );
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener("beforeunload", unloadEffect);

        return () => {
            window.removeEventListener("beforeunload", unloadEffect);
        };
    }, [unloadEffect]);

    if (error) {
        router.push("/login");
    }
};
