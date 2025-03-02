import type { GoFishState } from './types';

export const becomePlayer = (state: GoFishState, userId: string) => {
	if (state.playerIds.includes(userId)) {
		throw new Error('User is already playing');
	}
	state.playerIds.push(userId);
	state.players[userId] = {
		userId,
		hand: [],
	};
};
