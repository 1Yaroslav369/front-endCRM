import { useState } from 'react';
import Button from '../Buttons/AddButon';
import { archiveClient } from '../../services/clientService';
import type { Client } from '../../types/client';
import ClientModal from '../ClientModal/ClientsModal';
import styles from './ClientActions.module.scss';
import toast from 'react-hot-toast';
import ConfirmModal from '../ConfimModal/ConfirmModal';

interface Props {
  client: Client;
  onArchived: (id: number) => void;
  onUpdated: () => void;
}

const ClientActions = ({ client, onArchived, onUpdated }: Props) => {
  const [isArchiving, setIsArchiving] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleArchive = async () => {
    setIsArchiving(true);

    try {
      await archiveClient(client.id);

      toast.success('Client archived successfully');

      setIsConfirmOpen(false);
      onArchived(client.id);
    } catch {
      toast.error('Failed to archive client');
    } finally {
      setIsArchiving(false);
    }
  };
  
  return (
    <>
      <Button
        className={styles.edit}
        onClick={() => setIsEditOpen(true)}>
        Edit
      </Button>

      <Button
        className={styles.archive}
        onClick={() => setIsConfirmOpen(true)}
        disabled={isArchiving}>
        {isArchiving ? 'Archiving...' : 'Archive'}
      </Button>
      {isEditOpen && (
        <ClientModal
          mode="edit"
          client={client}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            setIsEditOpen(false);
            onUpdated();
          }}
        />
      )}
      {isConfirmOpen && (
        <ConfirmModal
          message={`Are you sure you want to archive? `}
          onConfirm={handleArchive}
          onCancel={() => setIsConfirmOpen(false)}
          loading={isArchiving}
        />
      )}
    </>
  );
};

export default ClientActions;
