<script lang="ts">
	import { action } from '$lib/util/action';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<{ messages: Array<{ userId: string; message: string }> }>;

	let message = '';
	const sendMessage = () => {
		const trimmedMessage = message.trim();
		if (!trimmedMessage) return;
		action('sendMessage', { message: trimmedMessage });
		message = '';
	};
	$: reversedMessages = $gameState.messages.toReversed();
</script>

<div class="flex h-full flex-col">
	<div class="flex grow flex-col-reverse overflow-y-auto">
		{#each reversedMessages as { userId, message }}
			<p>{userId}: {message}</p>
		{/each}
	</div>
	<div class="flex">
		<input
			type="text"
			bind:value={message}
			on:keypress={({ key }) => key === 'Enter' && sendMessage()}
			class="w-full border border-black p-1"
		/>
		<button class="border border-black p-1" on:click={sendMessage}>Send</button>
	</div>
</div>
