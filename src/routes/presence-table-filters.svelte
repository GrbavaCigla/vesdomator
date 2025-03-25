<script lang="ts">
    import { Label } from "$lib/components/ui/label";
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

<div
    class="flex gap-4 items-center justify-between rounded-md border p-2 shadow-sm"
>
    <Label for="presence" class="ml-1">Присутност</Label>
    <Select.Root name="presence" type="single" bind:value={$presence_filter}>
        <Select.Trigger class="w-28">{presence_content}</Select.Trigger>
        <Select.Content>
            {#each presence_options as option}
                <Select.Item value={option.value} label={option.label} />
            {/each}
        </Select.Content>
    </Select.Root>
</div>

<div
    class="flex gap-4 items-center justify-between rounded-md border p-2 shadow-sm"
>
    <Label for="university" class="ml-1">Универзитет</Label>
    <Select.Root
        name="university"
        type="single"
        bind:value={$university_filter}
    >
        <Select.Trigger class="w-28">{university_content}</Select.Trigger>
        <Select.Content>
            {#each university_options as option}
                <Select.Item value={option.value} label={option.label} />
            {/each}
        </Select.Content>
    </Select.Root>
</div>
