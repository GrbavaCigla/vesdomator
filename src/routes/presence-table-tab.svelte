<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import Search from "$lib/components/Search.svelte";
    import { Edit, ListRestart, Plus, Trash } from "@lucide/svelte";
    import * as Dialog from "$lib/components/ui/dialog";

    import { columns } from "./presence-columns";
    import PresenceTable from "./presence-table.svelte";
    import PresenceTableFilters from "./presence-table-filters.svelte";

    import { page } from "$app/state";
    import { absent_voters } from "$lib/stores/absent_voters";
    import { search_filter } from "$lib/stores/search_filter";
    import type { Faculty } from "$lib/models/faculty";
    import { ask } from "@tauri-apps/plugin-dialog";
    import AddFacultyDialog from "$lib/components/dialogs/AddFacultyDialog.svelte";

    let data = $derived(
        page.data.voters.map((val: Faculty, index: number) => {
            return {
                search_index: index + 1,
                is_present: !$absent_voters.has(val.name),
                ...val,
            };
        })
    );

    const reset_absences = async () => {
        const confirmation = await ask(
            "Да ли сте сигурни да желите да ресетујете изостанке?",
            { title: "Ресетовање изостанака", kind: "info" }
        );
        if (confirmation) $absent_voters.clear();
    };
</script>

<div class="flex gap-4 p-4">
    <div class="flex-1">
        <PresenceTable {data} {columns} />
    </div>
    <div class="flex flex-col gap-4">
        <Search bind:value={$search_filter} />

        <Dialog.Root>
            <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
                <Plus />Додај факултет
            </Dialog.Trigger>
            <AddFacultyDialog />
        </Dialog.Root>

        <PresenceTableFilters />
        <Button
            variant="outline"
            onclick={reset_absences}
            disabled={$absent_voters.size === 0}
        >
            <ListRestart /> Ресетуј изостанке
        </Button>
        <div class="flex gap-4 flex-col lg:flex-row">
            <Button variant="outline"><Edit /> Измени факултет</Button>
            <Button variant="destructive"><Trash /> Избриши факултет</Button>
        </div>
    </div>
</div>
