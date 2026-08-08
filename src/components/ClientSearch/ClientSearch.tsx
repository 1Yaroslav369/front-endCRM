import { useEffect, useRef, useState } from 'react';
import type { Client } from '../../types/client';
import { searchClients } from '../../services/clientService';
import styles from './ClientSearch.module.scss';

interface ClientSearchProps {
  selectedClient: Client | null;
  onSelect: (client: Client | null) => void;
  disabled?: boolean;
}

const ClientSearch = ({
  selectedClient,
  onSelect,
  disabled = false,
}: ClientSearchProps) => {
  const [query, setQuery] = useState(selectedClient?.name ?? '');
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (
      trimmedQuery.length < 2 ||
      (selectedClient && trimmedQuery === selectedClient.name)
    ) {
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);

        const results = await searchClients(trimmedQuery);

        setClients(results);
        setIsOpen(true);
      } catch {
        setClients([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, selectedClient]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);

    if (
      selectedClient &&
      value.trim() !== selectedClient.name
    ) {
      onSelect(null);
    }

    if (value.trim().length < 2) {
      setClients([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (client: Client) => {
    setQuery(client.name);
    setClients([]);
    setIsOpen(false);
    onSelect(client);
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}>
      <input
        type="text"
        placeholder="Search client..."
        value={query}
        disabled={disabled}
        autoComplete="off"
        onChange={(event) => handleChange(event.target.value)}
        onFocus={() => {
          if (clients.length > 0) {
            setIsOpen(true);
          }
        }}
      />

      {isOpen && (
        <div className={styles.results}>
          {isLoading && (
            <div className={styles.message}>
              Searching...
            </div>
          )}

          {!isLoading && clients.length === 0 && (
            <div className={styles.message}>
              No clients found
            </div>
          )}

          {!isLoading &&
            clients.map((client) => (
              <button
                key={client.id}
                type="button"
                className={styles.client}
                onClick={() => handleSelect(client)}>
                <span className={styles.name}>
                  {client.name}
                </span>

                {client.phone && (
                  <span className={styles.details}>
                    {client.phone}
                  </span>
                )}

                {client.email && (
                  <span className={styles.details}>
                    {client.email}
                  </span>
                )}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default ClientSearch;
