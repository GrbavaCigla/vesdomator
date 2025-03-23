import { renderComponent } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import PresenceTableToggle from "./presence-table-toggle.svelte";

export type Presence = {
    id: number;
    name: string;
    is_present: true;
};

export const columns: ColumnDef<Presence>[] = [
    {
        accessorKey: "name",
        header: "Факултет",
        meta: {
            headerClass: "w-full"
        }
    },
    {
        accessorKey: "is_present",
        header: "Присутност",
        cell: () => {
            return renderComponent(PresenceTableToggle, {});
        },
        meta: {
            cellClass: "float-right"
        }
    },
];
