import api from '../api/axios';

export interface Offer {
  id: number;
  client_id: number | null;

  client_name: string | null;
  client_phone: string | null;
  client_email: string | null;

  created_by: number;
  created_by_name?: string;

  offer_number: string;
  title: string;
  description: string | null;

  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'CONVERTED';

  net_price: number;
  vat: number;
  vat_amount: number;
  total_price: number;

  valid_until: string | null;
  comment: string | null;

  is_archived: number;
  created_at: string;
  updated_at: string;
}

export interface CreateOfferData {
  client_id: number | null;
  client_name?: string | null;
  client_phone?: string | null;
  client_email?: string | null;
  title: string;
  description?: string | null;
  net_price: number;
  vat: number;
  valid_until?: string | null;
  comment?: string | null;
}

//get all offers
export const getOffers = async (): Promise<Offer[]> => {
  const response = await api.get('/offers');
  return response.data;
};
