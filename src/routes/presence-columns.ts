import { renderComponent, renderSnippet } from "$lib/components/ui/data-table";
import type { ColumnDef } from "@tanstack/table-core";
import PresenceTableSwitch from "./presence-table-switch.svelte";
import { Badge } from "$lib/components/ui/badge";
import { createRawSnippet } from "svelte";
import { fuzzySort } from "$lib/filters/fuzzy";

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
        header: "",
        enableSorting: false,
        cell: ({ cell }) => {
            return cell.getValue() === null
                ? ""
                : renderComponent(Badge, {
                      children: createRawSnippet(() => {
                          return {
                              render() {
                                  return `<span>${cell.getValue()}</span>`;
                              },
                          };
                      }),
                  });
        },
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
