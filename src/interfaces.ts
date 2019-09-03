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

export interface ScheduleInterface {
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
