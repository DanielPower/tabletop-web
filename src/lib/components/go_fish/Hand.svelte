<script lang="ts">
	import type { Card } from '$lib/games/go_fish/types';
	import CardComponent from './CardComponent.svelte';

	export let cards: Card[];
</script>

<div class="flex flex-row gap-1">
	{#each cards as card}
		<div class="min-w-0.5 last:min-w-16">
			<CardComponent {card} />
		</div>
	{/each}
</div>
