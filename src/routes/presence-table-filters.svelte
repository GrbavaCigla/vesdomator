<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";

    import { presence_filter } from "$lib/stores/presence_filter";
    import { university_filter } from "$lib/stores/university_filter";

    const presence_options = [
        { value: "all", label: "Сви" },
        { value: "present", label: "Присутни" },
        { value: "absent", label: "Одсутни" },
    ];

    const university_options = [
        { value: "all", label: "Сви" },
        { value: "ubg", label: "УБГ" },
        { value: "rest", label: "Остали" },
    ];

    const presence_content = $derived(
        presence_options.find((f) => f.value === $presence_filter)?.label ??
            "Сви"
    );

    const university_content = $derived(
        university_options.find((f) => f.value === $university_filter)?.label ??
            "Сви"
    );
</script>

<Select.Root type="single" bind:value={$presence_filter}>
    <Select.Trigger>{presence_content}</Select.Trigger>
    <Select.Content>
        {#each presence_options as option}
            <Select.Item value={option.value} label={option.label} />
        {/each}
    </Select.Content>
</Select.Root>

<Select.Root type="single" bind:value={$university_filter}>
    <Select.Trigger>{university_content}</Select.Trigger>
    <Select.Content>
        {#each university_options as option}
            <Select.Item value={option.value} label={option.label} />
        {/each}
    </Select.Content>
</Select.Root>
