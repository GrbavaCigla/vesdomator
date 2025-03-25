import { renderComponent } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import PresenceTableSwitch from "./presence-table-switch.svelte";
import { fuzzySort } from "$lib/filters/fuzzy";
import PresenceTableBadges from "./presence-table-badges.svelte";

export type Presence = {
    search_index: number;
    name: string;
    short: string | undefined;
    ubg: boolean;
    is_present: true;
};

export const columns: ColumnDef<Presence>[] = [
    {
        accessorKey: "search_index",
        enableGlobalFilter: false,
        sortingFn: fuzzySort,
    },
    {
        accessorKey: "short",
        enableColumnFilter: false,
        enableSorting: false,
    },
    {
        accessorKey: "ubg",
        enableGlobalFilter: false,
        enableSorting: false,
    },
    {
        id: "tags",
        header: "",
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: ({ row }) =>
            renderComponent(PresenceTableBadges, {
                badges: (row.original.short === null
                    ? []
                    : [{ text: row.original.short as string }]
                ).concat(
                    row.original.ubg
                        ? [{ text: "УБГ", variant: "destructive" }]
                        : []
                ),
            }),
        meta: {
            cellClass: "float-right",
        },
    },
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
        enableSorting: false,
        enableGlobalFilter: false,
        cell: ({ cell, row }) => {
            return renderComponent(PresenceTableSwitch, {
                name: row.original.name,
                checked: cell.getValue() as boolean,
            });
        },
        meta: {
            cellClass: "float-right",
        },
    },
];
