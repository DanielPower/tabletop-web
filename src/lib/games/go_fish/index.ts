import { createGame } from '$lib/game';
import { drawCard, makeDeck, shuffle } from './deck';
import { becomePlayer } from './mutations';
import type { Card, GoFishState } from './types';

const initialState: GoFishState = {
	deck: [],
	players: {
		Test1: {
			userId: 'Test1',
			hand: [],
		},
		Test2: {
			userId: 'Test2',
			hand: [],
		},
		Test3: {
			userId: 'Test3',
			hand: [],
		},
	},
	playerIds: ['Test1', 'Test2', 'Test3'],
	vip: null,
	stage: 'waiting',
	turnIndex: 3,
	messages: [{ userId: 'server', message: 'Waiting for players' }],
};

const getUserView = (userId: string, state: GoFishState) => ({
	messages: state.messages,
	isVip: state.vip === userId,
	stage: state.stage,
	currentPlayer: state.playerIds[state.turnIndex % state.playerIds.length],
	players: Object.fromEntries(
		state.playerIds.map((playerId) => [
			playerId,
			{
				userId: playerId,
				hand:
					userId === playerId
						? state.players[playerId].hand
						: state.players[playerId].hand.map(
								(): Card => ({
									rank: 'unknown',
									suit: 'unknown',
								}),
							),
			},
		]),
	),
	userId,
});

const passTurn = (draft: GoFishState) => {
	draft.turnIndex = (draft.turnIndex + 1) % draft.playerIds.length;
};

const getUserActions = (userId: string, _state: GoFishState) => {
	return {
		becomePlayer: () => (draft: GoFishState) => becomePlayer(draft, userId),
		sendMessage:
			({ message }: { message: string }) =>
			(draft: GoFishState) => {
				draft.messages.push({ userId, message });
			},
		requestCard:
			({ targetUserId, rank }: { targetUserId: string; rank: string }) =>
			(draft: GoFishState) => {
				if (draft.stage !== 'playing') {
					throw new Error('Game is not in progress');
				}
				if (draft.turnIndex !== draft.playerIds.indexOf(userId)) {
					throw new Error('Not your turn');
				}
				if (!draft.playerIds.includes(targetUserId) || targetUserId === userId) {
					throw new Error('Invalid target');
				}
				if (!draft.players[targetUserId].hand.some((card) => card.rank === rank)) {
					draft.messages.push({ userId, message: 'Go Fish!' });
					drawCard(draft, userId);
					passTurn(draft);
				}
				const targetPlayer = draft.players[targetUserId];
				const player = draft.players[userId];
				const cards = targetPlayer.hand.filter((card) => card.rank === rank);
				targetPlayer.hand = targetPlayer.hand.filter((card) => card.rank !== rank);
				player.hand.push(...cards);
				draft.messages.push({ userId, message: `Asked ${targetUserId} for ${rank}` });
				passTurn(draft);
			},
		startGame: () => (draft: GoFishState) => {
			if (!draft.vip) {
				throw new Error('Not VIP');
			}
			if (draft.stage !== 'waiting') {
				throw new Error('Game already started');
			}
			draft.deck = makeDeck();
			draft.deck = shuffle(draft.deck);
			for (let i = 0; i < 10; i++) {
				for (const userId of Object.values(draft.playerIds)) {
					drawCard(draft, userId);
				}
			}
			draft.messages.push({ userId: 'server', message: 'Game started' });
			draft.stage = 'playing';
		},
	};
};

const onUserJoin = (userId: string) => (draft: GoFishState) => {
	if (!draft.vip) {
		draft.vip = userId;
		becomePlayer(draft, userId);
	}
	draft.messages.push({ userId: 'server', message: `${userId} has joined.` });
};

export type GoFishUserView = ReturnType<typeof getUserView>;
export type GoFishActions = ReturnType<typeof getUserActions>;
export const goFish = () => createGame(initialState, getUserView, getUserActions, onUserJoin);
