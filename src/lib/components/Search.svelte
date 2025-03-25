<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Search } from "@lucide/svelte";

    let { value = $bindable("") } = $props();
</script>

<div class="space-y-2">
    <div class="relative">
        <Input class="ps-9" placeholder="Претражи" type="search" bind:value />
        <div
            class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80"
        >
            <Search size={16} strokeWidth={2} aria-hidden="true" />
        </div>
    </div>
</div>
