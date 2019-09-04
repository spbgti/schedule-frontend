import { GroupInterface } from './interfaces';
import { ScheduleInterface } from './interfaces';

import axios from 'axios';

const instance = axios.create({ // здесь мы создаем отдельное его "состояние"
  baseURL: 'https://spbgti-tools-schedule-staging.herokuapp.com/api',
  timeout: 5000,
});

export async function getGroups() :Promise<GroupInterface[]> {
    return (await instance.get('/groups')).data as GroupInterface[];
}

export async function getScheduleById(id: string, num: string) :Promise<ScheduleInterface[]> {
    let params = {
        group: id,
        group_number: num,
        year: '2016',
        semester: '2',
    };
    return (await instance.get('/schedules', {
        params: params
    })).data as ScheduleInterface[];
}
/*
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
*/
