import { IGroup, ISchedule, IExercise } from "@/interfaces";

import axios from "axios";

const instance = axios.create({ // здесь мы создаем отдельное его "состояние"
  baseURL: "https://spbgti-tools-schedule-staging.herokuapp.com/api",
  timeout: 100000
});

export async function getGroups(): Promise<IGroup[]> {
  return (await instance.get("/groups")).data as IGroup[];
}

export async function getSchedule(groupId: string, year: string, semester: string): Promise<ISchedule[]> {
  let params = {
    group: groupId,
    year: year,
    semester: semester
  };
  return (await instance.get("/schedules", {
    params: params
  })).data as ISchedule[];
}

export async function getScheduleById(scheduleId: string): Promise<ISchedule> {
  return (await instance.get("/schedules/"+ scheduleId )).data as ISchedule;
}

export async function getExerciseById(exerciseId: string): Promise<IExercise> {
  return (await instance.get("/exercises/"+ exerciseId )).data as IExercise;
}

export async function getGroupNumById(grioupId: string): Promise<IGroup> {
  return (await instance.get("/groups/"+ grioupId )).data as IGroup;
}

