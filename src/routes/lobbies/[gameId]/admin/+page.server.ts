import type { PageServerLoad } from './$types';
import { lobbies } from '$lib/server/lobby_manager';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const lobby = lobbies.get(params.gameId);
	if (!lobby) {
		redirect(301, '/');
	}
	return {
		gameData: {
			gameId: params.gameId,
			gameMode: lobby.gameMode,
		},
		initialState: lobby.game.getState(),
	};
};
