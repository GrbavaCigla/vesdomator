<script lang="ts">
    import { Label } from "$lib/components/ui/label";
    import * as Select from "$lib/components/ui/select/index.js";

    const presence_options = [
        { value: "all", label: "Сви" },
        { value: "present", label: "Присутни" },
        { value: "absent", label: "Одсутни" },
    ];

    let value = $state(presence_options[0].value);

    const triggerContent = $derived(
        presence_options.find((f) => f.value === value)?.label ?? "Сви"
    );
</script>

<Select.Root type="single" bind:value>
    <Select.Trigger>{triggerContent}</Select.Trigger>
    <Select.Content>
        {#each presence_options as option}
            <Select.Item value={option.value} label={option.label} />
        {/each}
    </Select.Content>
</Select.Root>
