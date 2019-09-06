/*
export interface Example {
    id: number;
    something: string;
}
*/
export interface GroupInterface {
    group_id: number;
    number: string;
}

export interface ExerciseInterface {
    exercise_id: number;
    schedule_id: string;
    room_id: string;
    teachers: string;
    name: string;
    type: string;
    pair: string;
    day: string;
    parity: string;
}

export interface ScheduleInterface {
    schedule_id: number;
    group_id: string;
    year: string;
    semester: string;
    exercises: ExerciseInterface;
}
