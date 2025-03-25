<script lang="ts">
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import { absent_voters } from "$lib/stores/absent_voters";

    let {
        checked = $bindable(true),
        name,
    }: { checked: boolean; name: string } = $props();

    const toggle_presence = (val: boolean) =>
        val ? $absent_voters.delete(name) : $absent_voters.add(name);
</script>

<Switch bind:checked onCheckedChange={toggle_presence} />
