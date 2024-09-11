// components/NotificationSetup.tsx
import { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { messaging } from '../firebaseConfig'; // Replace with your Firebase config


const NotificationSetup = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const token = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
        console.log('FCM Token:', token);
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
      // Customize notification here
    });
  }, []);

  return null;
};

export default NotificationSetup;
