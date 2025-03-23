<script lang="ts">
    import { Separator } from "$lib/components/ui/separator";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
</script>

<Tabs.Root value="presence" class="w-full flex flex-col">
    <Tabs.List>
        <Tabs.Trigger value="presence">Присутност</Tabs.Trigger>
        <Tabs.Trigger value="agenda">Дневни ред</Tabs.Trigger>
    </Tabs.List>
    <Separator />
    <Tabs.Content value="presence">
        Присутност
    </Tabs.Content>
    <Tabs.Content value="agenda">
        Дневни ред
    </Tabs.Content>
</Tabs.Root>