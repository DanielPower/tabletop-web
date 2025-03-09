<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { subscribe } from '$lib/util/eventStream';
	import TicTacToe from '$lib/games/tictactoe/components/TicTacToe.svelte';
	import GoFish from '$lib/games/go_fish/components/GoFish.svelte';

	export let data: PageData;
	const gameState = writable(data.initialPlayerView) as any;
	const { gameMode, gameId } = data.gameData;

	onMount(() => {
		subscribe((message) => {
			gameState.set(message);
		});
	});
</script>

{#if gameMode === 'tictactoe'}
	<TicTacToe {gameState} />
{:else if gameMode === 'goFish'}
	<GoFish {gameState} {gameId} />
{:else}
	<p>Unknown game mode: {gameMode}</p>
{/if}
