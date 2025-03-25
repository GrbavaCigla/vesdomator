<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";

    let {
        badges,
    }: {
        badges: {
            text: string;
            variant:
                | "default"
                | "secondary"
                | "destructive"
                | "outline"
                | undefined;
        }[];
    } = $props();
</script>

<div class="flex gap-2">
    {#each badges as badge}
        <Badge variant={badge.variant}>{badge.text}</Badge>
    {/each}
</div>
