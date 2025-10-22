# Chat Features Documentation

## Overview

This document outlines the enhanced chat functionality implemented in the Performance React Native CLI application. The new features include support for audio recording, media attachments, and real-time messaging using Socket.IO.

## Features

### 1. Media Attachments

Users can now attach multiple media files to their messages:

- **Multiple Image Selection**: Users can select up to 5 images from their device gallery
- **Multi-Image Display**: Messages with multiple images are displayed in a horizontally scrollable gallery
- **Text with Media**: Users can include text along with image attachments, displayed together in the same message bubble
- **Preview**: Selected media is indicated in the message input field
- **Clear Selection**: Option to clear selected media before sending

### 2. Audio Recording

The application now supports voice messages:

- **Enhanced Permission Handling**:
  - Automatically checks and requests necessary permissions for audio recording
  - Guides users to settings if permissions are denied
  - Provides clear explanations for why permissions are needed
- **Record/Stop**: Toggle recording with the microphone button
- **Playback**: Tap on received audio messages to play them
- **Note**: Audio messages cannot include text content

### 3. Real-time Messaging

Messages are now delivered in real-time using Socket.IO:

- **Receive Only**: Socket is used only for receiving messages in real-time
- **API Sending**: All messages are sent using the REST API
- **Offline Handling**: Messages are still received via API if socket connection is unavailable

## Technical Implementation

### API Integration

The chat API has been updated to use FormData for sending messages with attachments:

```typescript
// Example API call with media
const messageData = {
  senderId: currentUserId,
  receiverId: receiverId,
  text: 'Optional message text',
  files: [
    /* media files */
  ],
  messageType: 'image', // or "audio"
};

await sendChatMessage(messageData);
```

### Socket.IO Integration

Real-time message receiving is implemented using Socket.IO:

```typescript
// Socket connection
socket = io(SOCKET_URL);

// Register user with the 'register' event
socket.emit('register', currentUserId);

// Receive messages
socket.on('receiveMessage', data => {
  // Handle incoming message
});
```

### Media Utilities

A new `mediaUtils.ts` module provides helper functions for media handling:

- `pickMedia()`: Opens the image picker
- `getAudioPath()`: Generates file paths for audio recordings
- `checkAudioPermissions()`: Handles permission requests
- `formatMediaMessage()`: Creates properly formatted message objects

## Usage

### Sending Text Messages

1. Type your message in the input field
2. Tap the send button

### Sending Media

1. Tap the attachment icon
2. Select one or more images from your gallery (up to 5)
3. (Optional) Add text to accompany the media - this will be sent together with the images
4. Tap the send button

### Viewing Multiple Images

1. When viewing a message with multiple images, scroll horizontally to see all images
2. The message will show the total number of images included

### Recording Voice Messages

1. Tap the microphone icon to start recording (permission will be requested if not already granted)
2. If permission is denied, you'll be guided to enable it in settings
3. Tap the microphone icon again to stop and send the recording
4. Note that any text in the input field will be cleared when sending an audio message

## Server-Side Requirements

The server must be configured to handle the following:

- FormData requests with `multipart/form-data` content type
- Socket.IO connections for real-time message receiving
- Proper storage and retrieval of media files

## Socket.IO Server Implementation

The server should implement the following Socket.IO event handlers:

```javascript
io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);

  socket.on('register', (userId: string) => {
    onlineUsers[userId] = socket.id;
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on('sendMessage', (data: any) => {
    const {receiverId} = data;
    const receiverSocketId = onlineUsers[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', data);
      console.log(`Message sent to ${receiverId}:`, data);
    } else {
      console.log(`User ${receiverId} is offline`);
    }
  });

  socket.on('disconnect', () => {
    for (const [userId, sId] of Object.entries(onlineUsers)) {
      if (sId === socket.id) {
        delete onlineUsers[userId];
        console.log(`User ${userId} disconnected`);
      }
    }
  });
});
```

Note: In our client implementation, we're only using the socket to receive messages. The server still needs the `sendMessage` event handler to process messages sent through the API and broadcast them to the appropriate connected clients.

Note: In our client implementation, we're only using the socket to receive messages. The server still needs the `sendMessage` event handler to process messages sent through the API and broadcast them to the appropriate connected clients.
