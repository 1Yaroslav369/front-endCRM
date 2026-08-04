import styles from './ConfirmModal.module.scss';
import Button from '../Buttons/AddButon';
interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmModal = ({
  message,
  onConfirm,
  onCancel,
  loading = false,
}: Props) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.actions}>
          <Button
            onClick={onConfirm}
            disabled={loading}>
            {loading ? 'Processing...' : 'Confirm'}
          </Button>
          <Button
            className={styles.cancel}
            onClick={onCancel}
            disabled={loading}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
