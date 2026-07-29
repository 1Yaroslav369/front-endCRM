import api from '../api/axios';

import type { Client, ClientFormData } from '../types/client';

export const getClients = async (): Promise<Client[]> => {
  const response = await api.get('/clients');

  return response.data;
};

export const getClientById = async (id: number): Promise<Client> => {
  const response = await api.get(`/clients/${id}`);

  return response.data;
};

export const createClient = async (
  clientData: ClientFormData,
): Promise<Client> => {
  const response = await api.post('/clients', clientData);

  return response.data;
};

export const updateClient = async (
  id: number,
  clientData: ClientFormData,
): Promise<Client> => {
  const response = await api.patch(`/clients/${id}`, clientData);

  return response.data;
};

export const deleteClient = async (id: number): Promise<void> => {
  await api.delete(`/clients/${id}`);
};

export const archiveClient = async (id: number): Promise<void> => {
  await api.patch(`/clients/${id}/archive`);
};
