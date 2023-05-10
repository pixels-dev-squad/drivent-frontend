import api from './api';

export async function creteTicketType(body, token) {
  const response = await api.post('/tickets/types', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
