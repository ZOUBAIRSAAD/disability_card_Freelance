import React, { createContext, useContext, ReactNode } from 'react';
import { useNotificationCounts, NotificationCounts } from '../hooks/useNotificationCounts';

interface NotificationContextType {
  counts: NotificationCounts;
  loading: boolean;
  decrementCount: (key: keyof NotificationCounts) => void;
  incrementCount: (key: keyof NotificationCounts) => void;
  refreshCounts: () => Promise<void>;
  markAsViewed: (type: keyof NotificationCounts, applicationId: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { counts, loading, decrementCount, incrementCount, refreshCounts, markAsViewed } = useNotificationCounts();

  return (
    <NotificationContext.Provider value={{
      counts,
      loading,
      decrementCount,
      incrementCount,
      refreshCounts,
      markAsViewed
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
