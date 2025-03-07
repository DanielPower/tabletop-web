import { lobbies } from '$lib/server/lobby_manager';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// BAD This is awful and probably causes resource leaks because I'm not timing out connections.
export const GET: RequestHandler = ({ params }) => {
	const lobby = lobbies.get(params.gameId);
	if (!lobby) {
		error(404, 'Game not found');
	}
	let unsubscribe: () => void;
	const encoder = new TextEncoder();
	const stream = new ReadableStream({
		start: (controller) => {
			unsubscribe = lobby.game.adminSubscribe((state: Record<string, any>) => {
				controller.enqueue(encoder.encode(JSON.stringify(state)));
			});
		},
		cancel: () => {
			unsubscribe();
		},
	});
	return new Response(stream, {
		headers: {
			'content-type': 'text/event-stream',
		},
	});
};
