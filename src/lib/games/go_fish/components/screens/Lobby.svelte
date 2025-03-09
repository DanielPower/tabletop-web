<script lang="ts">
	import { action } from '$lib/util/action';
	import type { Writable } from 'svelte/store';
	import type { GoFishActions, GoFishUserView } from '../..';

	const { gameState, gameId }: { gameState: Writable<GoFishUserView>; gameId: string } = $props();

	const joined = $derived(!!$gameState.players[$gameState.userId]);
	const isVip = $derived(() => $gameState.vip === $gameState.userId);
	const becomeMember = () => action<GoFishActions, 'becomePlayer'>('becomePlayer');
</script>

<h2 class="text-4xl">Lobby ID: {gameId.toUpperCase()}</h2>
<h2 class="font-bold">Players</h2>
<ul class="list-inside list-disc">
	{#each Object.values($gameState.players) as player (player.userId)}
		{#if player.userId === $gameState.vip}
			<li class="text-amber-200">{player.userId} (VIP)</li>
		{:else}
			<li>{player.userId}</li>
		{/if}
	{/each}
</ul>
{#if isVip()}
	<button
		class="rounded bg-blue-500 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700"
		onclick={() => action<GoFishActions, 'startGame'>('startGame')}>Start Game</button
	>
{:else if !joined}
	<button
		class="rounded bg-blue-500 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700"
		onclick={() => becomeMember()}>Join</button
	>
{:else}
	<p>Waiting on VIP to start the lobby</p>
{/if}
