<script lang="ts">
	import type { GoFishUserView } from '$lib/games/go_fish';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<GoFishUserView>;
</script>

<p>Go Fish</p>
