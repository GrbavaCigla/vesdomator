<script lang="ts">
    import { columns } from "./presence-columns";
    import PresenceTable from "./presence-table.svelte";
</script>

<div class="flex h-full gap-4 p-4">
    <div class="flex-1">
        <PresenceTable data={[]} {columns} />
    </div>
    <div class=""></div>
</div>
