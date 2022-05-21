export enum PathfindingEventType {
    visit,
    pathFound,
    pathNotFound
}

export interface PathfindingEvent {
    type: PathfindingEventType;
    nodes?: Node[];
}