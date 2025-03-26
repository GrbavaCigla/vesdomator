<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index";
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Switch } from "$lib/components/ui/switch";
    import { CreateFaculty } from "$lib/schemas/faculty/create";
    import { format_error } from "$lib/utils/format_error";

    let form = $state({
        name: "",
        short: "",
        ubg: false,
    });

    let parsed = $derived(CreateFaculty.safeParse(form));
    let errors = $derived(format_error(form, parsed));

    const submit = () => {
        // Logic
    };
</script>

<Dialog.Content class="max-w-sm">
    <Dialog.Header>
        <Dialog.Title class="text-center">Додај факултет</Dialog.Title>
        <Dialog.Description class="text-center">
            Унесите информације о факултету, а затим притисните на дугме
            'Сачувај'.
        </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
        <div class="grid grid-cols-3 items-center gap-4">
            <Label for="name" class="text-right">Име</Label>
            <Input
                id="name"
                class={`col-span-2${errors.name.error ? " border-red-500 !ring-red-500" : ""}`}
                bind:value={form.name}
            />
            {#if errors.name.message !== null}
                <div></div>
                <div class="col-span-2 text-red-500 text-sm -mt-2">
                    {errors.name.message}
                </div>
            {/if}
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
            <Label for="short" class="text-right">Скраћеница</Label>
            <Input
                id="short"
                class={`col-span-2${errors.short.error ? " border-red-500 !ring-red-500" : ""}`}
                bind:value={form.short}
            />
            {#if errors.short.message !== null}
                <div></div>
                <div class="col-span-2 text-red-500 text-sm -mt-2">
                    {errors.short.message}
                </div>
            {/if}
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
            <Label for="ubg" class="text-right">УБ</Label>
            <Switch
                id="ubg"
                class={`cols-span-2${errors.ubg.error ? " border-red-500 !ring-red-500" : ""}`}
                bind:checked={form.ubg}
            />
            {#if errors.ubg.message !== null}
                <div></div>
                <div class="col-span-2 text-red-500 text-sm -mt-2">
                    {errors.ubg.message}
                </div>
            {/if}
        </div>
    </div>
    <Dialog.Footer>
        <Button onclick={submit} disabled={!parsed.success}>Сачувај</Button>
    </Dialog.Footer>
</Dialog.Content>
