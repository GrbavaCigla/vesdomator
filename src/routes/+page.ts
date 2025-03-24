import type { PageLoad } from "./$types";

import { invoke } from "@tauri-apps/api/core";

export const load: PageLoad = async ({ params }) => {
    const config: { voters: string[] } = await invoke("load_config");

    return {
        voters: config.voters.map((val: string) => {
            return {
                name: val,
                is_present: true,
            };
        }),
    };
};
