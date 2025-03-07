<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { GoFishState } from '../types';
	import Chat from '$lib/games/shared/components/Chat.svelte';
	import Hand from './Hand.svelte';

	export let gameState: Writable<GoFishState>;
</script>

<div class="flex flex-col items-center justify-center">
	{#each Object.entries($gameState.players) as [playerId, player] (playerId)}
		<div
			class="max-w-full"
			class:bg-amber-800={playerId === $gameState.playerIds[$gameState.turnIndex]}
		>
			<p class="font-bold">
				{playerId}'s Hand
			</p>
			<Hand cards={player.hand} />
		</div>
	{/each}
</div>
<Chat {gameState} />
