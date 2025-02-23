import { createGame } from '$lib/game';

export type GoFishState = {
	deck: Array<string>;
	hands: { [key: string]: Array<string> };
	books: { [key: string]: Array<string> };
	users: Array<string>;
	turnIndex: number;
	messages: Array<{
		userId: string;
		message: string;
	}>;
};

const initialState: GoFishState = {
	deck: [],
	hands: {},
	books: {},
	users: [],
	turnIndex: 0,
	messages: [{ userId: 'server', message: 'Waiting for players' }],
};

const getUserView = (userId: string, state: GoFishState) => ({
	userId,
	...state,
});

export type GoFishUserView = ReturnType<typeof getUserView>;

const getUserActions = (userId: string, state: GoFishState) => {
	const currentPlayer = state.users[state.turnIndex];
	return {
		askForCard:
			({ targetUserId, card }: { targetUserId: string; card: string }) =>
			(draft: GoFishState) => {
				if (draft.users[state.turnIndex] !== userId) {
					return;
				}
				if (!draft.hands[targetUserId].includes(card)) {
					draft.hands[currentPlayer].push(draft.deck.pop()!);
					draft.turnIndex = (draft.turnIndex + 1) % draft.users.length;
					return;
				}
				draft.hands[currentPlayer].push(card);
				draft.hands[targetUserId] = draft.hands[targetUserId].filter((c) => c !== card);
				if (draft.hands[currentPlayer].filter((c) => c[0] === card[0]).length === 4) {
					draft.books[currentPlayer].push(card[0]);
				}
			},
	};
};

export type GoFishActions = ReturnType<typeof getUserActions>;

const onUserJoin = (userId: string) => (draft: GoFishState) => {
	draft.messages.push({ userId: 'server', message: `${userId} has joined.` });
	draft.users.push(userId);
};

export const goFish = () => createGame(initialState, getUserView, getUserActions, onUserJoin);
