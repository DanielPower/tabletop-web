import type { Card, GoFishState } from './types';

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;

export const makeDeck = (): Array<Card> => {
	const deck: Array<Card> = [];
	for (const suit of SUITS) {
		for (const rank of RANKS) {
			deck.push({ rank, suit });
		}
	}
	return deck;
};

export const shuffle = <T>(array: Array<T>): Array<T> => {
	array.sort(() => Math.random() - 0.5);
	return array;
};

export const drawCard = (draft: GoFishState, userId: string) => {
	const card = draft.deck.pop();
	if (!card) {
		throw new Error('No cards left in deck');
	}
	draft.players[userId].hand.push(card);
};
