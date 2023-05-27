import api from './api';

export async function getDates(token) {
  const response = await api.get('/activities/days', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivitiesByDate(token, day) {
  const response = await api.post('/activities/by-date', { date: day }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
