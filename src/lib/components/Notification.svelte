<script lang="ts">
    import { toast } from '$lib/store/toast.svelte';
	import { fade } from 'svelte/transition';

	let className = $state('')

	$effect(()=>{
		if( toast.text !== ''){
			setTimeout(()=>{
				toast.text = ''
			}, (toast.color === "red" ? 3000 : 1000 ))
		}
		className = toast.color === "green" ? 'bg-green-200 text-green-900 dark:bg-green-200 dark:text-green-900' : 'bg-red-200 dark:bg-red-200 text-red-900  dark:text-red-900';
	})

</script>
{#if toast.text !== ''}
<div transition:fade class="  
	z-[52] 
	fixed 
	top-0 
	left-0 
	w-full 
	">
	<div class="flex items-center w-full max-w-xs p-4 gap-2 {className}
		fixed 
		top-1 
		left-1/2 
		rounded-md
		transform -translate-x-1/2 
		" role="alert">
		<div class="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 ">
			{#if toast.color === 'green'}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
				</svg>
				<span class="sr-only">Check icon</span>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-circle-x">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
				</svg>
				<span class="sr-only">Error icon</span>
			{/if} 
		</div>
		{toast.text}
	</div>
</div>
{/if}