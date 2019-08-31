import { GroupInterface } from './interfaces';

import axios from 'axios';

const instance = axios.create({ // здесь мы создаем отдельное его "состояние"
  baseURL: 'https://spbgti-tools-schedule-staging.herokuapp.com/api',
  timeout: 1000,
});

export async function getGroups() :Promise<GroupInterface[]> {
    return (await instance.get('/groups')).data as GroupInterface[];
}
