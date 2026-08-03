import type { Client } from '../../types/client';

import styles from './ClientsTable.module.scss';


interface Props {
  clients: Client[];
  refreshClients: () => void;
}

const ClientsTable = ({ clients }: Props) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>NIP</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
          <th>Address</th>
          <th>Comment</th>
          <th>Created By</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.nip}</td>
            <td>{client.phone}</td>
            <td>{client.email}</td>
            <td>{client.city}</td>
            <td>{client.address}</td>
            <td>{client.comment}</td>
            <td>{client.created_by_name}</td>
            <td>{new Date(client.created_at).toLocaleDateString()}</td>
            <td>
              <button
                className={styles.view}
                onClick={() =>
                  (window.location.href = `/clients/${client.id}`)
                }>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientsTable;
