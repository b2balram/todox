import React from 'react';
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';

export default function Novu({subscriberId}) {
  return (
    <NovuProvider subscriberId={subscriberId} applicationIdentifier={process.env.REACT_APP_APPLICATION_IDENTIFIER}>
      <PopoverNotificationCenter colorScheme={'light'}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} colorScheme='light'/>}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};   