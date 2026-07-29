import { useState } from 'react';
import axios from 'axios';

import { createClient, updateClient } from '../../services/clientService';

import type { Client, ClientFormData } from '../../types/client';
import type { FormErrors } from '../../types/form';

import Button from '../Buttons/AddButon';

import styles from './ClientsModal.module.scss';

interface Props {
  mode: 'create' | 'edit';
  client?: Client;

  onClose: () => void;
  onSuccess: () => void;
}

const ClientModal = ({ mode, client, onClose, onSuccess }: Props) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<ClientFormData>(() => ({
    name: client?.name ?? '',
    nip: client?.nip ?? '',
    phone: client?.phone ?? '',
    email: client?.email ?? '',
    city: client?.city ?? '',
    address: client?.address ?? '',
    comment: client?.comment ?? '',
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    try {
      if (mode === 'create') {
        await createClient(formData);
      } else if (client) {
        await updateClient(client.id, formData);
      }

      onSuccess();

      onClose();
    } catch (error) {
      console.error('Client save error', error);

      if (axios.isAxiosError(error)) {
        const serverErrors = error.response?.data?.errors;

        if (serverErrors) {
          setErrors(serverErrors);
        } else {
          setErrors({
            general: 'Failed to save client',
          });
        }
      } else {
        setErrors({
          general: 'Unexpected error occurred',
        });
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{mode === 'create' ? 'Create Client' : 'Edit Client'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && <span>{errors.name}</span>}

          <input
            name="nip"
            placeholder="NIP"
            value={formData.nip ?? ''}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone ?? ''}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email ?? ''}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city ?? ''}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address ?? ''}
            onChange={handleChange}
          />

          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment ?? ''}
            onChange={handleChange}
          />

          {errors.general && <span>{errors.general}</span>}

          <div>
            <Button
              className={styles.Create}
              type="submit">
              {mode === 'create' ? 'Create' : 'Save'}
            </Button>

            <Button
              className={styles.Cancel}
              type="button"
              onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;
