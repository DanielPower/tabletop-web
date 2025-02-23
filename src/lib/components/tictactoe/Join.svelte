<script lang="ts">
	import type { TicTacToeActions, TicTacToeUserView } from '$lib/games/tictactoe';
	import { action } from '$lib/util/action';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<TicTacToeUserView>;
	const join = () => action<TicTacToeActions, 'becomePlayer'>('becomePlayer');
	$: alreadyJoined = $gameState.players.includes($gameState.userId);
</script>

{#if $gameState.players.length < 2 && !alreadyJoined}
	<button
		class="w-full rounded bg-blue-500 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700"
		on:click={() => join()}
	>
		Join
	</button>
{/if}
