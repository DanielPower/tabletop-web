<script lang="ts">
	import type { GoFishActions, GoFishUserView } from '$lib/games/go_fish';
	import type { Writable } from 'svelte/store';
	import Hand from '../Hand.svelte';
	import Chat from '$lib/games/shared/components/Chat.svelte';
	import type { Card } from '../../types';
	import { action } from '$lib/util/action';

	let selectedCard: Card | null = $state(null);
	const { gameState }: { gameState: Writable<GoFishUserView> } = $props();
	const yourTurn = $derived(() => $gameState.userId === $gameState.currentPlayer);

	const requestCard = (targetUserId: string, card: Card) =>
		action<GoFishActions, 'requestCard'>('requestCard', { rank: card.rank, targetUserId });
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-2">
	{#each Object.values( { ...$gameState.players }, ).filter((a) => a.userId !== $gameState.userId) as player (player.userId)}
		<Hand
			{player}
			isActive={$gameState.currentPlayer === player.userId}
			cards={player.hand}
			{selectedCard}
			onClickCard={() => yourTurn() && selectedCard && requestCard(player.userId, selectedCard)}
		/>
	{/each}
	<Hand
		player={$gameState.players[$gameState.userId]}
		isActive={yourTurn()}
		cards={$gameState.players[$gameState.userId].hand}
		{selectedCard}
		onClickCard={(card) => (selectedCard = card)}
	/>
	<div class="max-h-48 w-full grow bg-slate-600 p-1">
		<Chat {gameState} />
	</div>
</div>
