<script lang="ts">
    import {
        type ColumnDef,
        type SortingState,
        getCoreRowModel,
        getSortedRowModel,
    } from "@tanstack/table-core";
    import * as Table from "$lib/components/ui/table/index";
    import type { Presence } from "./presence-columns";
    import {
        createSvelteTable,
        FlexRender,
    } from "$lib/components/ui/data-table/index.js";

    type DataTableProps<Presence> = {
        columns: ColumnDef<Presence>[];
        data: Presence[];
    };

    let { data, columns }: DataTableProps<Presence> = $props();

    let sorting = $state<SortingState>([]);

    const table = createSvelteTable({
        get data() {
            return data;
        },
        columns,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: (updater) => {
            if (typeof updater === "function") {
                sorting = updater(sorting);
            } else {
                sorting = updater;
            }
        },
        state: {
            get sorting() {
                return sorting;
            },
        },
    });
</script>

<div class="rounded-md border">
    <Table.Root class="table-auto w-full">
        <Table.Header>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                <Table.Row>
                    {#each headerGroup.headers as header (header.id)}
                        <Table.Head
                            class={header.column.columnDef.meta?.headerClass}
                        >
                            {#if !header.isPlaceholder}
                                {@const enableSorting =
                                    header.column.columnDef.enableSorting !==
                                    false}
                                <div
                                    class={`flex ${enableSorting ? "cursor-pointer" : ""} items-center`}
                                    role={enableSorting ? `button` : undefined}
                                    tabindex={enableSorting ? "0" : undefined}
                                    onclick={() => {
                                        if (enableSorting) {
                                            header.column.toggleSorting();
                                        }
                                    }}
                                    onkeydown={(e) => {
                                        if (
                                            enableSorting &&
                                            (e.key === "Enter" || e.key === " ")
                                        ) {
                                            header.column.toggleSorting();
                                        }
                                    }}
                                >
                                    <FlexRender
                                        content={header.column.columnDef.header}
                                        context={header.getContext()}
                                    />
                                    {#if header.column.getIsSorted() === "asc"}
                                        <span class="m-1">↑</span>
                                    {:else if header.column.getIsSorted() === "desc"}
                                        <span class="m-1">↓</span>
                                    {:else}
                                        <span></span>
                                    {/if}
                                </div>
                            {/if}
                        </Table.Head>
                    {/each}
                </Table.Row>
            {/each}
        </Table.Header>
        <Table.Body>
            {#each table.getRowModel().rows as row (row.id)}
                <Table.Row data-state={row.getIsSelected() && "selected"}>
                    {#each row.getVisibleCells() as cell (cell.id)}
                        <Table.Cell
                            class={cell.column.columnDef.meta?.cellClass}
                        >
                            <FlexRender
                                content={cell.column.columnDef.cell}
                                context={cell.getContext()}
                            />
                        </Table.Cell>
                    {/each}
                </Table.Row>
            {:else}
                <Table.Row>
                    <Table.Cell
                        colspan={columns.length}
                        class="h-24 text-center"
                    >
                        Нема резултата.
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>
