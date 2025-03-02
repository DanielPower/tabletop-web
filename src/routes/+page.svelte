<script lang="ts">
	import squid from '$lib/assets/squid.png';
</script>

<div class="flex min-h-svh items-center justify-center p-8">
	<div class="flex flex-col items-center gap-5">
		<img src={squid} alt="Logo" class="max-h-40" />
		<h1 class="text-5xl">Fish Jam</h1>
		<form method="POST" action="/lobbies/?/new">
			<select
				name="gameMode"
				class="rounded border border-gray-400 bg-white px-4 py-2 text-xl leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
			>
				<option value="goFish">Go Fish</option>
				<option value="squidChess">Squid</option>
				<option value="tictactoe">TicTacToe</option>
			</select>
			<button
				type="submit"
				class="rounded bg-blue-500 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700"
			>
				Play
			</button>
		</form>
	</div>
</div>
