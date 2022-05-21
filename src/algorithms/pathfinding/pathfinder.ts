
class Pathfinder {
    grid: number[][]
    start: number[];
    finish: number[];

    dx = [-1, 1, 0, 0]

    constructor(grid: number[][], start: number[], finish: number[]) {
        this.grid = grid;
        this.start = start;
        this.finish = finish;
    }

    
}

export default Pathfinder;