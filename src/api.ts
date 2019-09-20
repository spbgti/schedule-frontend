import { IGroup, ISchedule } from "@/interfaces";

import axios from "axios";

const instance = axios.create({ // здесь мы создаем отдельное его "состояние"
  baseURL: "https://spbgti-tools-schedule-staging.herokuapp.com/api",
  timeout: 10000
});

export async function getGroups(): Promise<IGroup[]> {
  return (await instance.get("/groups")).data as IGroup[];
}

export async function getScheduleById(id: string, num: string, year: string, semester: string): Promise<ISchedule[]> {
  let params = {
    group: id,
    group_number: num,
    year: year,
    semester: semester
  };
  return (await instance.get("/schedules", {
    params: params
  })).data as ISchedule[];
}
