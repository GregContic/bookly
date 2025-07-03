const express = require('express');
const { Expo } = require('expo-server-sdk');
const cors = require('cors');

const app = express();
const expo = new Expo();

// Middleware
app.use(cors());
app.use(express.json());

// Store push tokens (in production, use a database)
let pushTokens = new Set();

// Endpoint to register push tokens
app.post('/push-tokens', (req, res) => {
  const { token } = req.body;
  
  if (!Expo.isExpoPushToken(token)) {
    return res.status(400).json({ error: 'Invalid push token' });
  }
  
  pushTokens.add(token);
  console.log('📱 Push token registered:', token);
  
  res.json({ success: true, message: 'Push token registered' });
});

// Endpoint to send test notification
app.post('/send-test-notification', async (req, res) => {
  const { to, title, body, data } = req.body;
  
  if (!to || !Expo.isExpoPushToken(to)) {
    return res.status(400).json({ error: 'Invalid push token' });
  }
  
  try {
    const messages = [{
      to,
      sound: 'default',
      title: title || 'Test Notification',
      body: body || 'This is a test notification',
      data: data || { test: true },
      categoryId: 'default',
      priority: 'high',
    }];
    
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    
    for (const chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }
    
    console.log('📤 Test notification sent:', tickets);
    res.json({ success: true, tickets });
  } catch (error) {
    console.error('❌ Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Endpoint to send booking confirmation
app.post('/send-booking-confirmation', async (req, res) => {
  const { serviceName, date, bookingId } = req.body;
  
  if (pushTokens.size === 0) {
    return res.status(400).json({ error: 'No push tokens registered' });
  }
  
  try {
    const messages = Array.from(pushTokens).map(token => ({
      to: token,
      sound: 'default',
      title: 'Booking Confirmed! 🎉',
      body: `Your booking for ${serviceName} on ${date} has been confirmed.`,
      data: {
        type: 'booking_confirmed',
        bookingId,
        serviceName,
        date,
      },
      categoryId: 'booking',
      priority: 'high',
    }));
    
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    
    for (const chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }
    
    console.log('📤 Booking confirmation sent:', tickets);
    res.json({ success: true, tickets });
  } catch (error) {
    console.error('❌ Error sending booking confirmation:', error);
    res.status(500).json({ error: 'Failed to send booking confirmation' });
  }
});

// Endpoint to send promo notification
app.post('/send-promo-notification', async (req, res) => {
  const { title, message, promoData } = req.body;
  
  if (pushTokens.size === 0) {
    return res.status(400).json({ error: 'No push tokens registered' });
  }
  
  try {
    const messages = Array.from(pushTokens).map(token => ({
      to: token,
      sound: 'default',
      title: title || 'Special Offer! 🎉',
      body: message || 'Check out our latest promotional offers!',
      data: {
        type: 'promo',
        ...promoData,
      },
      categoryId: 'promo',
      priority: 'default',
    }));
    
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    
    for (const chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }
    
    console.log('📤 Promo notification sent:', tickets);
    res.json({ success: true, tickets });
  } catch (error) {
    console.error('❌ Error sending promo notification:', error);
    res.status(500).json({ error: 'Failed to send promo notification' });
  }
});

// Endpoint to get registered tokens (for debugging)
app.get('/push-tokens', (req, res) => {
  res.json({
    tokens: Array.from(pushTokens),
    count: pushTokens.size
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Push notification server running on port ${PORT}`);
  console.log(`📱 Ready to handle push notifications for BooklyPH`);
});

module.exports = app;
