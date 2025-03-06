<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { subscribe } from '$lib/util/eventStream';
	import TicTacToe from '$lib/components/tictactoe/TicTacToe.svelte';
	import GoFish from '$lib/components/go_fish/GoFish.svelte';

	export let data: PageData;
	const gameState = writable(data.initialPlayerView) as any;
	const { gameMode } = data.gameData;

	onMount(() => {
		subscribe((message) => {
			gameState.set(message);
		});
	});
</script>

{#if gameMode === 'tictactoe'}
	<TicTacToe {gameState} />
{:else if gameMode === 'goFish'}
	<GoFish {gameState} />
{:else}
	<p>Unknown game mode: {gameMode}</p>
{/if}
