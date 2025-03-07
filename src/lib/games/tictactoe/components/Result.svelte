<script lang="ts">
	import type { TicTacToeUserView } from '$lib/games/tictactoe';
	import type { Writable } from 'svelte/store';
	export let gameState: Writable<TicTacToeUserView>;
</script>

{#if $gameState.gameover}
	<div class="rounded-lg bg-white p-4 shadow-lg">
		{#if $gameState.winner === $gameState.userId}
			🎉 You won!
		{:else if $gameState.winner}
			😢 You lost!
		{:else}
			🤝 It's a tie!
		{/if}
	</div>
{/if}
