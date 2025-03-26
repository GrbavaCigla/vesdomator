<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import Search from "$lib/components/Search.svelte";
    import { ListRestart, Plus, Trash } from "@lucide/svelte";

    import { columns } from "./presence-columns";
    import PresenceTable from "./presence-table.svelte";
    import PresenceTableFilters from "./presence-table-filters.svelte";

    import { page } from "$app/state";
    import { absent_voters } from "$lib/stores/absent_voters";
    import { search_filter } from "$lib/stores/search_filter";
    import type { Faculty } from "$lib/models/faculty";
    import { invalidateAll } from "$app/navigation";

    let data = $derived(
        page.data.voters.map((val: Faculty, index: number) => {
            return {
                search_index: index + 1,
                is_present: !$absent_voters.has(val.name),
                ...val,
            };
        })
    );
</script>

<div class="flex gap-4 p-4">
    <div class="flex-1">
        <PresenceTable {data} {columns} />
    </div>
    <div class="flex flex-col gap-4">
        <Search bind:value={$search_filter} />
        <Button variant="outline">
            <Plus />Додај факултет
        </Button>
        <PresenceTableFilters />
        <Button variant="destructive" onclick={() => $absent_voters.clear()}>
            <ListRestart /> Ресетуј изостанке
        </Button>
    </div>
</div>
