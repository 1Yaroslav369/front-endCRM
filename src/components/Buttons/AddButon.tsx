import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Buttons.module.scss';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}


const Button = ({
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.buttonAdd}`}
      {...props}
    >
      {children}
    </button>
  );
};


export default Button;