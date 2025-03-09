export type Player = {
	userId: string;
	hand: Array<Card>;
	score: number;
};

export type GoFishState = {
	deck: Array<Card>;
	players: { [key: string]: Player };
	playerIds: Array<string>;
	turnIndex: number;
	vip: string | null;
	stage: 'waiting' | 'playing' | 'gameover';
	messages: Array<{
		userId: string;
		message: string;
	}>;
};

export type Rank = number | 'unknown';

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades' | 'unknown';

export type Card = {
	rank: Rank;
	suit: Suit;
	id: string;
};
