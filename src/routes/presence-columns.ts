import { renderComponent } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import PresenceTableSwitch from "./presence-table-switch.svelte";

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
            headerClass: "w-full",
        },
    },
    {
        accessorKey: "is_present",
        header: "Присутност",
        cell: ({ cell, row }) => {
            return renderComponent(PresenceTableSwitch, {
                name: row.original.name,
                checked: cell.getValue() as boolean,
            });
        },
        meta: {
            cellClass: "float-right",
        },
        enableSorting: false,
    },
];
