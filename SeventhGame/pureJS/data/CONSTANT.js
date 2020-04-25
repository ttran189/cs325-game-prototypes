export const CONSTANT = {
    gameBoard: {
        S_POINT_CONSTRAINT: 40,
        NUM_ROWS: 24,
        NUM_COLS: 10,
        CELL_SIZE: 20,
        OFFSET_COL: 20,
        OFFSET_ROW: 3,
        OFFSET_NEXT_COL: 13,
        OFFSET_NEXT_ROW_1: 3,
        OFFSET_NEXT_ROW_2: 10,
        OFFSET_MIDDLE: 3,
        SCORE_PER_ROW: 50,
        SCORE_PER_GO_DOWN: 5,
        BOARD_DATA: [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null]
        ],
        BRICK_SHAPES: [
            {
                name: "shape_i",
                grids: [
                    [
                        [null, null, null, null],
                        ["x", "x", "x", "x"],
                        [null, null, null, null],
                        [null, null, null, null]
                    ],
                    [
                        [null, null, "x", null],
                        [null, null, "x", null],
                        [null, null, "x", null],
                        [null, null, "x", null]
                    ],
                    [
                        [null, null, null, null],
                        [null, null, null, null],
                        ["x", "x", "x", "x"],
                        [null, null, null, null]
                    ],
                    [
                        [null, "x", null, null],
                        [null, "x", null, null],
                        [null, "x", null, null],
                        [null, "x", null, null]
                    ],
                ]
            },
            {
                name: "shape_l1",
                grids: [
                    [
                        ["x", null, null],
                        ["x", "x", "x"],
                        [null, null, null]
                    ],
                    [
                        [null, "x", "x"],
                        [null, "x", null],
                        [null, "x", null]
                    ],
                    [
                        [null, null, null],
                        ["x", "x", "x"],
                        [null, null, "x"]
                    ],
                    [
                        [null, "x", null],
                        [null, "x", null],
                        ["x", "x", null]
                    ],
                ]
            },
            {
                name: "shape_l2",
                grids: [
                    [
                        [null, null, "x"],
                        ["x", "x", "x"],
                        [null, null, null]
                    ],
                    [
                        [null, "x", null],
                        [null, "x", null],
                        [null, "x", "x"]
                    ],
                    [
                        [null, null, null],
                        ["x", "x", "x"],
                        ["x", null, null]
                    ],
                    [
                        ["x", "x", null],
                        [null, "x", null],
                        [null, "x", null]
                    ],
                ]
            },
            {
                name: "shape_z1",
                grids: [
                    [
                        [null, "x", "x"],
                        ["x", "x", null],
                        [null, null, null]
                    ],
                    [
                        [null, "x", null],
                        [null, "x", "x"],
                        [null, null, "x"]
                    ],
                    [
                        [null, null, null],
                        [null, "x", "x"],
                        ["x", "x", null]
                    ],
                    [
                        ["x", null, null],
                        ["x", "x", null],
                        [null, "x", null]
                    ],
                ]
            },
            {
                name: "shape_z2",
                grids: [
                    [
                        ["x", "x", null],
                        [null, "x", "x"],
                        [null, null, null]
                    ],
                    [
                        [null, null, "x"],
                        [null, "x", "x"],
                        [null, "x", null]
                    ],
                    [
                        [null, null, null],
                        ["x", "x", null],
                        [null, "x", "x"]
                    ],
                    [
                        [null, "x", null],
                        ["x", "x", null],
                        ["x", null, null]
                    ],
                ]
            },
            {
                name: "shape_o",
                grids: [
                    [
                        [null, "x", "x", null],
                        [null, "x", "x", null],
                        [null, null, null, null]
                    ],
                    [
                        [null, "x", "x", null],
                        [null, "x", "x", null],
                        [null, null, null, null]
                    ],
                    [
                        [null, "x", "x", null],
                        [null, "x", "x", null],
                        [null, null, null, null]
                    ],
                    [
                        [null, "x", "x", null],
                        [null, "x", "x", null],
                        [null, null, null, null]
                    ],
                ]
            },
            {
                name: "shape_t",
                grids: [
                    [
                        [null, "x", null],
                        ["x", "x", "x"],
                        [null, null, null]
                    ],
                    [
                        [null, "x", null],
                        [null, "x", "x"],
                        [null, "x", null]
                    ],
                    [
                        [null, null, null],
                        ["x", "x", "x"],
                        [null, "x", null]
                    ],
                    [
                        [null, "x", null],
                        ["x", "x", null],
                        [null, "x", null]
                    ],
                ]
            }
        ]
    }
};