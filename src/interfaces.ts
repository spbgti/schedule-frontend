export interface IGroup {
    group_id: number;
    number: string;
}

export interface IRoom {
    room_id: number;
    name: string;
    location_id: number;
}

export interface ILocation {
    location_id: number;
    name: string;
    geo_position: string; 
}

export interface IExercise {
    exercise_id: number;
    schedule_id: string;
    room_id: number;
    teachers: Array<string>;
    name: string;
    type: string;
    pair: string;
    day: string;
    parity: string;
}

export interface ISchedule {
    schedule_id: number;
    group_id: string;
    year: string;
    semester: string;
    exercises: IExercise;
}

