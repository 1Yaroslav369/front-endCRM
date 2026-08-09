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

  const [netPrice, setNetPrice] = useState('');
  const [vat, setVat] = useState('23');

  const [comment, setComment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const netPriceNumber = Number(netPrice) || 0;
  const vatNumber = Number(vat) || 0;

  const vatAmount = netPriceNumber * (vatNumber / 100);
  const totalPrice = netPriceNumber + vatAmount;

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

    if (!netPrice.trim()) {
      toast.error('Please enter price without VAT.');
      return;
    }

    if (netPriceNumber <= 0) {
      toast.error('Price without VAT must be greater than 0.');
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
        net_price: netPriceNumber,
        vat: vatNumber,
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
              onChange={event => setTitle(event.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.labelDeadline}>
                Deadline
              </label>

              <DatePicker
                selected={deadline}
                onChange={(date: Date | null) => setDeadline(date)}
                dateFormat="dd/MM/yyyy"
                locale="pl"
                placeholderText="Select a date"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Finance</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="netPrice">
                Price without VAT *
              </label>

              <input
                id="netPrice"
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={netPrice}
                onChange={event => setNetPrice(event.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="vat">VAT</label>

              <select
                id="vat"
                value={vat}
                onChange={event => setVat(event.target.value)}
                disabled={isSubmitting}>
                <option value="23">23%</option>
                <option value="8">8%</option>
                <option value="5">5%</option>
                <option value="0">0%</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.labelVatAmount}>VAT amount</label>

              <input
                type="text"
                value={`${vatAmount.toFixed(2)} PLN`}
                readOnly
              />
            </div>

            <div className={styles.field}>
              <label className={styles.labelTotalPrice}>Total for client</label>

              <input
                type="text"
                value={`${totalPrice.toFixed(2)} PLN`}
                readOnly
              />
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
              onChange={event => setComment(event.target.value)}
              disabled={isSubmitting}
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

