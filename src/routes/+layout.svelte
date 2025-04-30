<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';
    import Notification from '$lib/components/Notification.svelte';
	import '../app.css';
	
	let { children } = $props();
</script>
<Loader/>
<Notification/>
{@render children()}
