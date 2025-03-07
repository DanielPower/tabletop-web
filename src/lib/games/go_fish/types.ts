export type Player = {
	userId: string;
	hand: Array<Card>;
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

export type Card = {
	rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A' | 'unknown';
	suit: 'hearts' | 'diamonds' | 'clubs' | 'spades' | 'unknown';
	id: string;
};
