
class Pathfinder {
    grid: number[][]
    start: number[];
    finish: number[];
    walls:  number[][];

    dx = [-1, 1, 0, 0]

    constructor(grid: number[][], walls: number[][],  start: number[], finish: number[]) {
        this.grid = grid;
        this.start = start;
        this.finish = finish;
        this.walls = walls;
    }


}

export default Pathfinder;