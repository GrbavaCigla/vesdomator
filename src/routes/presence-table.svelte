<script lang="ts">
    import {
        type ColumnDef,
        type SortingState,
        type ColumnFiltersState,
        getCoreRowModel,
        getSortedRowModel,
        getFilteredRowModel,
        type ColumnSort,
        type VisibilityState,
    } from "@tanstack/table-core";
    import * as Table from "$lib/components/ui/table/index";
    import type { Presence } from "./presence-columns";
    import {
        createSvelteTable,
        FlexRender,
    } from "$lib/components/ui/data-table/index.js";
    import { fuzzyFilter } from "$lib/filters/fuzzy";
    import { search_filter } from "$lib/stores/search_filter";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { university_filter } from "$lib/stores/university_filter";
    import { presence_filter } from "$lib/stores/presence_filter";
    import { toggle_filter } from "$lib/utils/toggle_filter";

    type DataTableProps<Presence> = {
        columns: ColumnDef<Presence>[];
        data: Presence[];
    };

    let { data, columns }: DataTableProps<Presence> = $props();

    const defaultSorting: ColumnSort = {
        id: "search_index",
        desc: false,
    };

    let sorting = $state<SortingState>([defaultSorting]);
    let columnFilters = $state<ColumnFiltersState>([]);
    let columnVisibility = $state<VisibilityState>({
        search_index: false,
        short: false,
        ubg: false,
    });

    const table = createSvelteTable({
        get data() {
            return data;
        },
        columns,
        globalFilterFn: fuzzyFilter,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: (updater) => {
            if (typeof updater === "function") {
                sorting = updater(sorting);
            } else {
                sorting = updater;
            }
            if (sorting.length === 0) sorting = [defaultSorting];
        },
        onColumnFiltersChange: (updater) => {
            if (typeof updater === "function") {
                columnFilters = updater(columnFilters);
            } else {
                columnFilters = updater;
            }
        },
        onColumnVisibilityChange: (updater) => {
            if (typeof updater === "function") {
                columnVisibility = updater(columnVisibility);
            } else {
                columnVisibility = updater;
            }
        },
        onGlobalFilterChange: (updater) => {
            if (typeof updater === "function") {
                $search_filter = updater($search_filter);
            } else {
                $search_filter = updater;
            }
        },
        state: {
            get sorting() {
                return sorting;
            },
            get columnFilters() {
                return columnFilters;
            },
            get globalFilter() {
                return $search_filter;
            },
            get columnVisibility() {
                return columnVisibility;
            },
        },
    });

    presence_filter.subscribe((val) => {
        table.setColumnFilters(toggle_filter(
            $state.snapshot(columnFilters),
            "is_present",
            { absent: false, present: true, all: undefined }[val]
        ));
    });
    university_filter.subscribe((val) => {
        table.setColumnFilters(toggle_filter(
            $state.snapshot(columnFilters),
            "ubg",
            { rest: false, ubg: true, all: undefined }[val]
        ));
    });

    $effect(() => {
        $inspect(columnFilters);
    });
</script>

<div class="rounded-md border shadow-sm mr-2">
    <!-- TODO: This is a workaround because I cannot spend any more time on this -->
    <ScrollArea
        class="h-[calc(100vh-2rem-36px)] w-full"
        scrollbarYClasses="absolute left-[calc(100%+0.125rem)]"
    >
        <Table.Root class="w-full">
            <Table.Header>
                {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                    <Table.Row>
                        {#each headerGroup.headers as header (header.id)}
                            <Table.Head
                                class={header.column.columnDef.meta
                                    ?.headerClass}
                            >
                                {#if !header.isPlaceholder}
                                    {@const enableSorting =
                                        header.column.columnDef
                                            .enableSorting !== false}
                                    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
                                    <div
                                        class={`flex ${enableSorting ? "cursor-pointer" : ""} items-center`}
                                        role={enableSorting
                                            ? `button`
                                            : undefined}
                                        tabindex={enableSorting ? 0 : undefined}
                                        onclick={() => {
                                            if (enableSorting) {
                                                header.column.toggleSorting();
                                            }
                                        }}
                                        onkeydown={(e) => {
                                            if (
                                                enableSorting &&
                                                (e.key === "Enter" ||
                                                    e.key === " ")
                                            ) {
                                                header.column.toggleSorting();
                                            }
                                        }}
                                    >
                                        <FlexRender
                                            content={header.column.columnDef
                                                .header}
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
    </ScrollArea>
</div>
