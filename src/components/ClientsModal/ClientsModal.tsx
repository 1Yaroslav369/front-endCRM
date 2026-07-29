import { useState } from 'react';
import axios from 'axios';

import { createClient } from '../../services/clientService';
import type { ClientFormData } from '../../types/client';
import type { FormErrors } from '../../types/form';

import Button from '../../components/Buttons/AddButon';

import styles from './ClientsModal.module.scss';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateClientModal = ({ onClose, onSuccess }: Props) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    phone: '',
    nip: '',
    email: '',
    city: '',
    address: '',
    comment: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    try {
      await createClient(formData);

      onSuccess();

      onClose();
    } catch (error) {
      console.error('Create client error', error);

      if (axios.isAxiosError(error)) {
        const serverErrors = error.response?.data?.errors;

        if (serverErrors) {
          setErrors(serverErrors);
        } else {
          setErrors({
            general: 'Failed to create client',
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
        <h2>Create Client</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

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

          <div>
            <Button
              className={styles.Create}
              type="submit">
              Create
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

export default CreateClientModal;
