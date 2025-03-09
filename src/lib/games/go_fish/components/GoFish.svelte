<script lang="ts">
	import type { GoFishUserView } from '$lib/games/go_fish';
	import type { Writable } from 'svelte/store';
	import Gameplay from './screens/Gameplay.svelte';
	import Lobby from './screens/Lobby.svelte';

	export let gameState: Writable<GoFishUserView>;
	export let gameId: string;
</script>

<div class="h-svh w-full bg-slate-900 p-2 text-white">
	{#if $gameState.stage === 'waiting'}
		<Lobby {gameState} {gameId} />
	{:else}
		<Gameplay {gameState} />
	{/if}
</div>
