import api from "../api/axios";

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

  status: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED" | "CONVERTED";

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

export interface UpdateOfferData {
  title: string;
  description?: string | null;

  net_price: number;
  vat: number;

  valid_until?: string | null;
  comment?: string | null;
}

// GET ALL OFFERS
export const getOffers = async (): Promise<Offer[]> => {
  const response = await api.get("/offers");

  return response.data.offers;
};

// GET OFFER BY ID
export const getOfferById = async (id: number): Promise<Offer> => {
  const response = await api.get(`/offers/${id}`);

  return response.data.offer;
};

// CREATE OFFER
export const createOffer = async (data: CreateOfferData): Promise<Offer> => {
  const response = await api.post("/offers", data);

  return response.data.offer;
};

// UPDATE OFFER
export const updateOffer = async (
  id: number,
  data: UpdateOfferData,
): Promise<Offer> => {
  const response = await api.patch(`/offers/${id}`, data);

  return response.data.offer;
};

// UPDATE OFFER STATUS
export const updateOfferStatus = async (
  id: number,
  status: Offer["status"],
): Promise<Offer> => {
  const response = await api.patch(`/offers/${id}/status`, {
    status,
  });

  return response.data.offer;
};

// CONVERT OFFER TO ORDER
export const convertOfferToOrder = async (id: number) => {
  const response = await api.post(`/offers/${id}/convert-to-order`);

  return response.data;
};

// DOWNLOAD OFFER PDF
export const downloadOfferPdf = async (id: number) => {
  const response = await api.get(`/offers/${id}/download`, {
    responseType: "blob",
  });

  return response.data;
};
