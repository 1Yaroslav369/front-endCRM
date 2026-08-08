import styles from './NewOrder.module.scss';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FormEvent } from 'react';

import DatePicker, { registerLocale } from 'react-datepicker';
import { pl } from 'date-fns/locale/pl';

import { isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import 'react-datepicker/dist/react-datepicker.css';

import api from '../../api/axios';
import type { Client } from '../../types/client';
import ClientSearch from '../../components/ClientSearch/ClientSearch';

registerLocale('pl', pl);

const NewOrderPage = () => {
  const navigate = useNavigate();

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [status, setStatus] = useState('New');

  const [totalPrice, setTotalPrice] = useState('');
  const [vat, setVat] = useState('23');

  const [comment, setComment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedClient) {
      toast.error('Please select a client.');
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter order title.');
      return;
    }

    if (!totalPrice.trim()) {
      toast.error('Please enter total price.');
      return;
    }

    if (Number(totalPrice) <= 0) {
      toast.error('Total price must be greater than 0.');
      return;
    }

    let formattedDeadline: string | null = null;

    if (deadline) {
      const year = deadline.getFullYear();
      const month = String(deadline.getMonth() + 1).padStart(2, '0');
      const day = String(deadline.getDate()).padStart(2, '0');

      formattedDeadline = `${year}-${month}-${day}`;
    }

    try {
      setIsSubmitting(true);

      const response = await api.post('/orders', {
        client_id: selectedClient.id,
        title: title.trim(),
        total_price: Number(totalPrice),
        deadline: formattedDeadline,
        comment: comment.trim() || null,
      });

      toast.success('Order created successfully!');

      if (response.data?.id) {
        navigate(`/orders/${response.data.id}`);
        return;
      }

      navigate('/orders');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            'Failed to create order. Please try again.',
        );
      } else {
        toast.error('Failed to create order. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Create Order</h1>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2>Client</h2>

          <div className={styles.field}>
            <label htmlFor="client">Client *</label>

            <ClientSearch
              selectedClient={selectedClient}
              onSelect={setSelectedClient}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2>Order Details</h2>

          <div className={styles.field}>
            <label htmlFor="title">Title *</label>

            <input
              id="title"
              type="text"
              placeholder="Order title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.labelDeadline}>Deadline</label>

              <DatePicker
                selected={deadline}
                onChange={(date: Date | null) => setDeadline(date)}
                dateFormat="dd/MM/yyyy"
                locale="pl"
                placeholderText="Select a date"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.labelStatus}>Status</label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}>
                <option value="New">New</option>
                <option value="In production">In production</option>
                <option value="Installation">Installation</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Finance</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="totalPrice">Total price *</label>

              <input
                id="totalPrice"
                type="number"
                placeholder="0"
                min="0"
                step="0.01"
                value={totalPrice}
                onChange={(event) => setTotalPrice(event.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="vat">VAT</label>

              <select
                id="vat"
                value={vat}
                onChange={(event) => setVat(event.target.value)}>
                <option value="23">23%</option>
                <option value="8">8%</option>
                <option value="5">5%</option>
                <option value="0">0%</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Additional Information</h2>

          <div className={styles.field}>
            <label htmlFor="comment">Comment</label>

            <textarea
              id="comment"
              placeholder="Additional notes..."
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => navigate('/orders')}
            disabled={isSubmitting}>
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Order'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewOrderPage;
