<script lang="ts">
	import type { GoFishActions, GoFishUserView } from '$lib/games/go_fish';
	import type { Writable } from 'svelte/store';
	import { action } from '$lib/util/action';
	import Hand from '../Hand.svelte';

	export let gameState: Writable<GoFishUserView>;
</script>

<div>
	{#each Object.values($gameState.players) as player}
		<p class="font-bold">
			{player.userId === $gameState.userId ? 'Your Hand' : `${player.userId}'s Hand`}
		</p>
		<Hand cards={player.hand} />
	{/each}
</div>
