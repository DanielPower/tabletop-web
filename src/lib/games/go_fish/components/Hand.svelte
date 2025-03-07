<script lang="ts">
	import type { Card } from '$lib/games/go_fish/types';
	import CardComponent from './CardComponent.svelte';

	let {
		cards,
		selectedCard,
		onClickCard,
	}: { cards: Card[]; selectedCard: Card | null; onClickCard: (card: Card) => void } = $props();
</script>

<div class="flex flex-shrink flex-row gap-1">
	{#each cards.sort((a, b) => (a.rank > b.rank ? 1 : -1)) as card (card.id)}
		<button class="min-w-0.5 last:min-w-16" onclick={() => onClickCard(card)}>
			<CardComponent {card} selected={!!selectedCard && selectedCard.id === card.id} />
		</button>
	{/each}
</div>
