import { NavLink } from 'react-router-dom';

//styles
import styles from './Sidebar.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : styles.link;

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>CRM System</div>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          end
          className={getLinkClass}>
          Dashboard
        </NavLink>

        <NavLink
          to="/leads"
          className={getLinkClass}>
          Leads
        </NavLink>

        <NavLink
          to="/offers"
          className={getLinkClass}>
          Offers
        </NavLink>

        <NavLink
          to="/orders"
          className={getLinkClass}>
          Orders
        </NavLink>

        <NavLink
          to="/finance"
          className={getLinkClass}>
          Finance
        </NavLink>

        <NavLink
          to="/installation"
          className={getLinkClass}>
          Installation
        </NavLink>

        <NavLink
          to="/clients"
          className={getLinkClass}>
          Clients
        </NavLink>

        <NavLink
          to="/settings"
          className={getLinkClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
