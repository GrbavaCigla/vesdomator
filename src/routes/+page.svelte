<script lang="ts">
    import PresenceTable from "./presence-table-tab.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
</script>

<Tabs.Root value="presence" class="w-full h-screen flex flex-col">
    <Tabs.List class="rounded-none">
        <Tabs.Trigger value="presence">Присутност</Tabs.Trigger>
        <Tabs.Trigger value="voting">Гласање</Tabs.Trigger>
    </Tabs.List>
    <Separator />
    <Tabs.Content value="presence" class="mt-0 h-full">
        <PresenceTable />
    </Tabs.Content>
    <Tabs.Content value="voting">Гласање</Tabs.Content>
</Tabs.Root>
