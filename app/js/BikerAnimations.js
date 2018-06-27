const animations = {
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
		frameSequence: [0, 1, 2, 3],
		tpf: 7
	},
	duck: {
		nextAction: 'ducking',
		frameRow: 1,
		frameSequence: [0, 1],
		tpf: 40
	},
	unduck: {
		nextAction: 'ride',
		frameRow: 1,
		frameSequence: [6, 7],
		tpf: 40
	},
	ducking: {
		nextAction: 'ducking',
		frameRow: 1,
		frameSequence: [2, 3, 4, 5],
		tpf: 4
	},
	crashDown: {
		nextAction: null,
		frameRow: 3,
		frameSequence: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		tpf: 5
	},
	crashUp: {
		nextAction: null,
		frameRow: 2,
		frameSequence: [0, 1, 2, 3, 4, 5, 6, 7],
		tpf: 5
	}
};
