<script lang="ts">
	import type { SquidChessActions, SquidChessUserView } from '$lib/games/squid_chess';
	import { action } from '$lib/util/action';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<SquidChessUserView>;
	const join = (color: 'white' | 'black') =>
		action<SquidChessActions, 'becomePlayer'>('becomePlayer', { color });
	$: alreadyJoined = Object.values($gameState.players).find(
		(player) => player.userId === $gameState.userId,
	);
	$: gameFull = Object.values($gameState.players).every((player) => player.userId);
</script>

{#if !alreadyJoined && !gameFull}
	<div class="flex">
		<button
			disabled={!!$gameState.players.white.userId}
			class="w-full rounded bg-blue-500 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700 disabled:opacity-50"
			on:click={() => join('white')}
		>
			Join as White
		</button>
		<button
			disabled={!!$gameState.players.black.userId}
			class="w-full rounded bg-blue-500 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700 disabled:opacity-50"
			on:click={() => join('black')}
		>
			Join as Black
		</button>
	</div>
{/if}
