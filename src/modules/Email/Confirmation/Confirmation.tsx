/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

import { UserService } from "@/@classes";
import type { ApiResponse } from "@/@types";

/**
 *
 * @returns
 */
export const Confirmation = (): JSX.Element => {
    const router = useRouter();
    const { token } = router.query;
    React.useEffect(() => {
        if (token !== undefined) {
            UserService.confirmEmail(token as string)
                .then((result: ApiResponse<boolean>) => {
                    const { data } = result;
                    if (data) {
                        toast.success("Successfully confirmed email", {
                            autoClose: 10_000,
                        });
                    } else {
                        toast.error(
                            "Failed to confirm email, please try again",
                            { autoClose: 7500 },
                        );
                    }
                })
                .catch((error: unknown) => {
                    toast.error(
                        `Failed to confirm email ${(error as Error).message}`,
                    );
                });
            router.push("/dashboard");
        }
    }, [router, token]);

    return <div />;
};
