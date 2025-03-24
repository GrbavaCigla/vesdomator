<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import Search from "$lib/components/Search.svelte";
    import { Plus } from "@lucide/svelte";

    import { columns } from "./presence-columns";
    import PresenceTable from "./presence-table.svelte";
    import PresenceTableFilters from "./presence-table-filters.svelte";

    import { page } from "$app/state";
</script>

<div class="flex h-full gap-4 p-4">
    <div class="flex-1">
        <PresenceTable data={page.data.voters} {columns} />
    </div>
    <div class="flex flex-col gap-4">
        <Search />
        <Button variant="outline">
            <Plus />Додај факултет
        </Button>
        <PresenceTableFilters />
    </div>
</div>
