const axios = require('axios'); // здесь создание объекта axios

const instance = axios.create({ // здесь мы создаем отдельное его "состояние"
  baseURL: 'https://spbgti-tools-schedule-staging.herokuapp.com/api',
  timeout: 1000,
});

export function getGroups() {
    return instance.get('/groups');
}
