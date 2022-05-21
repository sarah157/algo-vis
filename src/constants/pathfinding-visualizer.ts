export enum PathfindingEventType {
    visit,
    pathFound,
    noPathFound
}

export interface PathfindingEvent {
    type: PathfindingEventType;
    position?: number[];
    path?: number[][];
}