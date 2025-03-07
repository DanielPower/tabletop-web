import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { lobbies } from '$lib/server/lobby_manager';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const userId = locals.session.data.userIds[params.gameId];
	if (!userId) {
		return error(404);
	}
	const lobby = lobbies.get(params.gameId);
	if (!lobby) {
		return error(404);
	}
	const { action, args } = await request.json();
	const actions = lobby.game.getUserActions(userId);
	if (!(action in actions)) {
		return json('Action not available', { status: 400 });
	}
	const updater = actions[action](args);
	try {
		lobby.game.updateState(updater);
		console.log(`ACTION[${action}] user[${userId}] args:${JSON.stringify(args)}`);
		return json('Success');
	} catch (e) {
		if (e instanceof Error) {
			console.error(e);
			return json(e.message, { status: 400 });
		}
		throw e;
	}
};
