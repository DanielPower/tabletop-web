import { nanoid } from 'nanoid/non-secure';
import type { Card, GoFishState, Rank } from './types';

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;

export const makeDeck = (): Array<Card> => {
	const deck: Array<Card> = [];
	for (const suit of SUITS) {
		for (const rank of RANKS) {
			deck.push({ rank, suit, id: nanoid() });
		}
	}
	return deck;
};

export const rankString = (rank: Rank): string => {
	switch (rank) {
		case 11:
			return 'J';
		case 12:
			return 'Q';
		case 13:
			return 'K';
		case 'unknown':
			return '?';
		default:
			return rank.toString();
	}
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
