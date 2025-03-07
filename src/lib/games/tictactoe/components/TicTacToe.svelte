<script lang="ts">
	import Chat from '$lib/games/shared/components/Chat.svelte';
	import Board from '$lib/games/tictactoe/components/Board.svelte';
	import Join from '$lib/games/tictactoe/components/Join.svelte';
	import Result from '$lib/games/tictactoe/components/Result.svelte';
	import type { TicTacToeUserView } from '$lib/games/tictactoe/tictactoe';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<TicTacToeUserView>;
</script>

<div class="flex h-svh w-full flex-col p-4">
	<div class="flex items-center justify-center">
		<div class="flex flex-col gap-4">
			<Result {gameState} />
			<Board {gameState} />
			<Join {gameState} />
		</div>
	</div>
	<div class="flex-grow">
		<Chat {gameState} />
	</div>
</div>
