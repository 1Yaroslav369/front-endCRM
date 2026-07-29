import styles from './FormError.module.scss';


interface FormErrorProps {
  error?: string;
}


const FormError = ({ error }: FormErrorProps) => {
  if (!error) {
    return null;
  }


  return (
    <p className={styles.error}>
      {error}
    </p>
  );
};


export default FormError;