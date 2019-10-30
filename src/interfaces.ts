export interface IGroup {
    group_id: Number;
    number: string;
}

export interface IExercise {
    exercise_id: Number;
    schedule_id: string;
    room_id: string;
    teachers: string;
    name: string;
    type: string;
    pair: string;
    day: string;
    parity: string;
}

export interface ISchedule {
    schedule_id: Number;
    group_id: string;
    year: string;
    semester: string;
    exercises: IExercise;
}

