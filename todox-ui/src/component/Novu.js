import React from 'react';
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';

export default function Novu() {
  return (
    <NovuProvider subscriberId={process.env.REACT_APP_NOVU_SUBSCRIBER_ID} applicationIdentifier={process.env.REACT_APP_APPLICATION_IDENTIFIER}>
      <PopoverNotificationCenter colorScheme={'light'}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} colorScheme='light'/>}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};   