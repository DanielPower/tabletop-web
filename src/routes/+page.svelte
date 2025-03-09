<script>
	const joinLobby = () => {
		if (lobbyId.length === 0) {
			return;
		}
		if (lobbyId.length !== 4) {
			error = 'Lobby ID must be 4 characters long';
			return;
		}
		window.location.href = `/lobbies/${lobbyId.toLowerCase()}`;
	};

	let lobbyId = '';
	let error = '';
</script>

<div class="flex min-h-svh items-center justify-center bg-slate-800 p-8 text-white">
	<div class="flex flex-col items-center gap-5">
		<h1 class="text-5xl">Fish Jam</h1>
		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}
		<div class="flex rounded border-1">
			<form onsubmit={joinLobby}>
				<input
					type="text"
					placeholder="Lobby ID"
					class="px-4 py-2 text-xl font-bold uppercase"
					bind:value={lobbyId}
				/>
				<button
					type="submit"
					class="rounded bg-blue-500 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700"
				>
					Join
				</button>
			</form>
		</div>
		<h2 class="text-3xl">Or</h2>
		<form method="POST" action="/lobbies/?/new">
			<input type="hidden" name="gameMode" value="goFish" />
			<button
				type="submit"
				class="rounded bg-blue-500 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700"
			>
				Create a lobby
			</button>
		</form>
	</div>
</div>
