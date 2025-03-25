import { SvelteSet } from "svelte/reactivity";
import { writable, type Writable } from "svelte/store";

export const absent_voters: Writable<SvelteSet<string>> = writable(
    new SvelteSet()
);
