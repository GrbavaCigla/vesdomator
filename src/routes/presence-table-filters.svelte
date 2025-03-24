<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";

    import { presence_filter } from "$lib/stores/presence_filter";

    const presence_options = [
        { value: "all", label: "Сви" },
        { value: "present", label: "Присутни" },
        { value: "absent", label: "Одсутни" },
    ];

    const triggerContent = $derived(
        presence_options.find((f) => f.value === $presence_filter)?.label ?? "Сви"
    );
</script>

<Select.Root type="single" bind:value={$presence_filter}>
    <Select.Trigger>{triggerContent}</Select.Trigger>
    <Select.Content>
        {#each presence_options as option}
            <Select.Item value={option.value} label={option.label} />
        {/each}
    </Select.Content>
</Select.Root>
