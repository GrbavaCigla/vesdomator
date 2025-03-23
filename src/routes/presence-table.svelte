<script lang="ts">
    import { type ColumnDef, getCoreRowModel } from "@tanstack/table-core";
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

    const table = createSvelteTable({
        get data() {
            return data;
        },
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
</script>

<div class="rounded-md border">
    <Table.Root class="table-auto w-full">
        <Table.Header>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                <Table.Row>
                    {#each headerGroup.headers as header (header.id)}
                        <Table.Head class={header.column.columnDef.meta?.headerClass}>
                            {#if !header.isPlaceholder}
                                <FlexRender
                                    content={header.column.columnDef.header}
                                    context={header.getContext()}
                                />
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
                        <Table.Cell class={cell.column.columnDef.meta?.cellClass}>
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
