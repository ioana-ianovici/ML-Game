export const animations = {
	idle: {
		nextAction: 'idle',
		frameRow: 0,
		frameSequence: [0],
		tpf: Infinity
	},
	ride: {
		nextAction: null,
		frameRow: 0,
		frameSequence: [0, 1, 2, 3, 4, 5, 6, 7],
		tpf: 4
	},
	jump: {
		nextAction: 'ride',
		frameRow: 4,
		frameSequence: [0, 1, 1, 2, 2, 3],
		tpf: 7
	},
	duck: {
		nextAction: 'ducking',
		frameRow: 1,
		frameSequence: [0, 1],
		tpf: 4
	},
	unduck: {
		nextAction: 'ride',
		frameRow: 1,
		frameSequence: [6, 7],
		tpf: 4
	},
	ducking: {
		nextAction: null,
		frameRow: 1,
		frameSequence: [1, 2, 3, 4, 5, 6],
		tpf: 4
	},
	crashDown: {
		nextAction: 'lastFrame',
		frameRow: 3,
		frameSequence: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		tpf: 5
	},
	crashUp: {
		nextAction: 'lastFrame',
		frameRow: 2,
		frameSequence: [0, 1, 2, 3, 4, 5, 6, 7],
		tpf: 5
	}
};
