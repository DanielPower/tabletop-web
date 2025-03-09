import { createGame } from '$lib/game';
import { drawCard, makeDeck, shuffle } from './deck';
import { becomePlayer } from './mutations';
import type { Card, GoFishState, Rank } from './types';

const initialState: GoFishState = {
	deck: [],
	players: {
		a: { userId: 'a', hand: [], score: 0 },
		b: { userId: 'b', hand: [], score: 0 },
		c: { userId: 'c', hand: [], score: 0 },
		d: { userId: 'd', hand: [], score: 0 },
	},
	playerIds: ['a', 'b', 'c', 'd'],
	vip: null,
	stage: 'waiting',
	turnIndex: 2,
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
				score: state.players[playerId].score,
				hand:
					userId === playerId
						? state.players[playerId].hand
						: state.players[playerId].hand.map(
								({ id }): Card => ({
									id,
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

const checkSets = (draft: GoFishState, playerId: string) => {
	const player = draft.players[playerId];
	const sets = player.hand.reduce((acc, card) => {
		const count = acc.get(card.rank) || 0;
		acc.set(card.rank, count + 1);
		return acc;
	}, new Map<Rank, number>());

	for (const rank of sets.keys()) {
		if (sets.get(rank) === 4) {
			draft.messages.push({ userId: player.userId, message: `Found a set of ${rank}s` });
			player.hand = player.hand.filter((card) => card.rank !== rank);
			player.score += 1;
		}
	}
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
			({ targetUserId, rank }: { targetUserId: string; rank: Rank }) =>
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
					checkSets(draft, userId);
					passTurn(draft);
				}
				const targetPlayer = draft.players[targetUserId];
				const player = draft.players[userId];
				const cards = targetPlayer.hand.filter((card) => card.rank === rank);
				targetPlayer.hand = targetPlayer.hand.filter((card) => card.rank !== rank);
				player.hand.push(...cards);
				draft.messages.push({ userId, message: `Asked ${targetUserId} for ${rank}` });
				checkSets(draft, userId);
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
