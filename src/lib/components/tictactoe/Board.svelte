<script lang="ts">
	import type { TicTacToeUserView } from '$lib/games/tictactoe';
	import type { Writable } from 'svelte/store';
	import Cell from './Cell.svelte';

	export let gameState: Writable<TicTacToeUserView>;
</script>

<div>
	{#each { length: 3 } as _, i (i)}
		<div class="flex">
			{#each { length: 3 } as _, j (j)}
				<Cell {gameState} id={i * 3 + j} />
			{/each}
		</div>
	{/each}
</div>
