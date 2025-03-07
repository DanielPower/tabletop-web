<script lang="ts">
	import type { Card } from '$lib/games/go_fish/types';

	let { card, selected }: { card: Card; selected: boolean } = $props();
	let color = card.suit === 'hearts' || card.suit === 'diamonds' ? 'red' : 'black';
	let icon = {
		hearts: '♥',
		diamonds: '♦',
		spades: '♠',
		clubs: '♣',
		unknown: '?',
	}[card.suit];
</script>

{#if card.rank === 'unknown' && card.suit === 'unknown'}
	<div
		class="unknown h-32 w-16 rounded-md bg-slate-200 shadow-lg inset-ring-2 shadow-slate-900"
	></div>
{:else}
	<div
		class="h-32 w-16 rounded-md p-2 shadow-lg shadow-slate-950"
		class:bg-slate-200={!selected}
		class:hover:bg-amber-100={!selected}
		class:bg-amber-200={selected}
		style="color: {color}"
	>
		<div class="flex w-4 flex-col items-center text-base/[1]">
			<div>{icon}</div>
			<div>{card.rank}</div>
		</div>
	</div>
{/if}

<style>
	.unknown {
		background-color: #e5e5f7;
		opacity: 1;
		background-image:
			linear-gradient(
				30deg,
				#f75d45 12%,
				transparent 12.5%,
				transparent 87%,
				#f75d45 87.5%,
				#f75d45
			),
			linear-gradient(
				150deg,
				#f75d45 12%,
				transparent 12.5%,
				transparent 87%,
				#f75d45 87.5%,
				#f75d45
			),
			linear-gradient(
				30deg,
				#f75d45 12%,
				transparent 12.5%,
				transparent 87%,
				#f75d45 87.5%,
				#f75d45
			),
			linear-gradient(
				150deg,
				#f75d45 12%,
				transparent 12.5%,
				transparent 87%,
				#f75d45 87.5%,
				#f75d45
			),
			linear-gradient(
				60deg,
				#f75d4577 25%,
				transparent 25.5%,
				transparent 75%,
				#f75d4577 75%,
				#f75d4577
			),
			linear-gradient(
				60deg,
				#f75d4577 25%,
				transparent 25.5%,
				transparent 75%,
				#f75d4577 75%,
				#f75d4577
			);
		background-size: 20px 35px;
		background-position:
			0 0,
			0 0,
			10px 18px,
			10px 18px,
			0 0,
			10px 18px;
	}
</style>
