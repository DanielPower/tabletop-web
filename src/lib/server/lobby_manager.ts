import { tictactoe } from '../games/tictactoe/tictactoe';
import { goFish } from '../games/go_fish';

export const games = { tictactoe, goFish };
export const lobbies = new Map<string, { gameMode: string; game: any }>();

export const createLobby = (gameMode: string) => {
	const lobbyId = Math.random().toString(36).substr(2, 4);
	console.log(gameMode);
	if (!(gameMode in games)) {
		throw new Error(`Unknown game mode: ${gameMode}`);
	}
	const game = games[gameMode as keyof typeof games]();
	lobbies.set(lobbyId, { gameMode, game });
	console.log(`Lobby created: ${lobbyId}`);
	return lobbyId;
};
