<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { GoFishUserView } from '../..';

	const { gameState }: { gameState: Writable<GoFishUserView>; gameId: string } = $props();
</script>

<h2 class="font-bold">Players</h2>
<ul class="list-inside list-disc">
	{#each Object.values($gameState.players) as player (player.userId)}
		<li>{player.userId}: {player.score}</li>
	{/each}
</ul>
