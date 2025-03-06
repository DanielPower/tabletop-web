<script lang="ts">
	import type { GoFishUserView } from '$lib/games/go_fish';
	import type { Writable } from 'svelte/store';
	import Hand from '../Hand.svelte';
	import Chat from '$lib/components/Chat.svelte';

	export let gameState: Writable<GoFishUserView>;
</script>

<div class="flex flex-col items-center justify-center">
	{#each Object.values($gameState.players).sort( (a, b) => (a.userId === $gameState.userId ? 1 : -1), ) as player (player.userId)}
		<div class="max-w-full" class:bg-amber-800={player.userId === $gameState.currentPlayer}>
			<p class="font-bold">
				{player.userId === $gameState.userId ? 'Your Hand' : `${player.userId}'s Hand`}
			</p>
			<Hand cards={player.hand} />
		</div>
	{/each}
</div>
<Chat {gameState} />
