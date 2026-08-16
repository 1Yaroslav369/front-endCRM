import { useNavigate } from 'react-router-dom';

import type { Offer } from '../../services/offerService';

import styles from './OffersTable.module.scss';

interface OffersTableProps {
  offers: Offer[];
}

const OffersTable = ({ offers }: OffersTableProps) => {
  const navigate = useNavigate();

  const formatDate = (date: string | null) => {
    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleDateString('pl-PL');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(price);
  };

  const getStatusClass = (status: Offer['status']) => {
    switch (status) {
      case 'DRAFT':
        return styles.draft;

      case 'SENT':
        return styles.sent;

      case 'ACCEPTED':
        return styles.accepted;

      case 'REJECTED':
        return styles.rejected;

      case 'EXPIRED':
        return styles.expired;

      case 'CONVERTED':
        return styles.converted;

      default:
        return '';
    }
  };

  if (offers.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No offers found</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Client</th>
            <th>Title</th>
            <th>Net</th>
            <th>Total</th>
            <th>Valid until</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {offers.map(offer => (
            <tr
              key={offer.id}
              onClick={() => navigate(`/offers/${offer.id}`)}
              className={styles.row}
            >
              <td className={styles.offerNumber}>
                {offer.offer_number}
              </td>

              <td>
                <div className={styles.client}>
                  <span className={styles.clientName}>
                    {offer.client_name || 'Potential client'}
                  </span>

                  {!offer.client_id && (
                    <span className={styles.potential}>
                      Potential client
                    </span>
                  )}
                </div>
              </td>

              <td>{offer.title}</td>

              <td>
                {formatPrice(Number(offer.net_price))}
              </td>

              <td>
                {formatPrice(Number(offer.total_price))}
              </td>

              <td>{formatDate(offer.valid_until)}</td>

              <td>
                <span
                  className={`${styles.status} ${getStatusClass(
                    offer.status,
                  )}`}
                >
                  {offer.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OffersTable;