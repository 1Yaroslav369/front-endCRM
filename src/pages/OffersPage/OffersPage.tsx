import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OffersTable from '../../components/OffersTable/OffersTable';
import { getOffers } from '../../services/offerService';
import type { Offer } from '../../services/offerService';

import styles from './OffersPage.module.scss';

const OffersPage = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffers();

        setOffers(data);
      } catch (error) {
        console.error('Failed to load offers', error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section className={styles.offers}>
      <div className={styles.header}>
        <h1 className={styles.titleHidden}>Offers</h1>

        <button
          type="button"
          onClick={() => navigate('/offers/new')}
          className={styles.createButton}
        >
          Create Offer
        </button>
      </div>

      <OffersTable offers={offers} />
    </section>
  );
};

export default OffersPage;