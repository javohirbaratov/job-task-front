import React from 'react';
import styles from "./mainLayout.module.css"
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
};

export default MainLayout;