<script lang="ts">
    import { loader } from "$lib/store/loader.svelte";
    import { onMount } from "svelte";

    let {data} = $props()

    onMount(()=>{
        loader.show = false
    })
</script>

<div style="box-shadow: 0 215px 0 -100px #52525c inset;">
    <!-- Centered main content -->
    <div class=" container md:mx-auto px-3 md:px-0">
        <!-- Top nav bar -->
        <div class=" bg-zinc-600 text-white py-3 flex justify-between">
            <!-- left Logo -->
            <img src="/SlateDevLogo.png" alt="Slate Dev Logo" class="md:h-10 h-8"/>
            <!-- right Nav links -->
            <div class="flex items-center gap-3">
                <div class=" opacity-50 text-sm">{data.user.email}</div>
                <a href="/logout" aria-label="Sign Out" title="Sign Out">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                </a>
            </div>
        </div>
        <!-- Main content -->
        <div class="rounded-lg bg-zinc-100 p-4 min-h-64">
            <h1 class="text-2xl">Welcome to SvelteKit</h1>
            <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
        </div>
    </div>

</div>

