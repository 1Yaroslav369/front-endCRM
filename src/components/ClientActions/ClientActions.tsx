import Button from '../../components/Buttons/AddButon';

import styles from './ClientActions.module.css';


interface Props {
  clientId: number;
}


const ClientActions = ({
  clientId,
}: Props) => {

  const handleView = () => {
    console.log('View client', clientId);
  };


  const handleEdit = () => {
    console.log('Edit client', clientId);
  };


  const handleDelete = () => {
    console.log('Delete client', clientId);
  };


  return (
    <div className={styles.actions}>

      <Button
        onClick={handleView}
      >
        View
      </Button>


      <Button
        onClick={handleEdit}
      >
        Edit
      </Button>


      <Button
        onClick={handleDelete}
      >
        Delete
      </Button>

    </div>
  );
};


export default ClientActions;