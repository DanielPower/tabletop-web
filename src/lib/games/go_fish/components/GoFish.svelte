<script lang="ts">
	import type { GoFishActions, GoFishUserView } from '$lib/games/go_fish';
	import type { Writable } from 'svelte/store';
	import { action } from '$lib/util/action';
	import Gameplay from './screens/Gameplay.svelte';

	export let gameState: Writable<GoFishUserView>;
	$: joined = !!$gameState.players[$gameState.userId];
	const becomeMember = () => action<GoFishActions, 'becomePlayer'>('becomePlayer');
</script>

<div class="p-2">
	{#if $gameState.stage === 'waiting'}
		{#if !joined}
			<button on:click={() => becomeMember()}>Join</button>
		{/if}
		{#if $gameState.isVip}
			<button on:click={() => action<GoFishActions, 'startGame'>('startGame')}>Start Game</button>
		{/if}
	{:else}
		<Gameplay {gameState} />
	{/if}
</div>
