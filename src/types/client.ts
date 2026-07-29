export interface Client {
  id: number;
  name: string;
  nip: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  address: string | null;
  comment: string | null;
  created_by: number | null;
  updated_by: number | null;
  created_by_name?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientFormData {
  name: string;
  nip: string | null;
  phone?: string | null;
  email?: string | null;
  city?: string | null;
  address?: string | null;
  comment?: string | null;
}
