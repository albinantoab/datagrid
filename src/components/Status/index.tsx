import styles from './styles.module.css';
import { StatusProps } from './types';

const Status = ({ status }: StatusProps) => {
  return <div className={styles.Status}>
    {status === 'available' && <span className={styles.GreenDot}></span>}
    <span>{status === 'available' ? 'Available' : 'Scheduled'}</span>
  </div>;
};

export { Status, type StatusProps };
