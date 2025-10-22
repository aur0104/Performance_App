# Video Picker Components

This directory contains reusable video picker components with built-in 30-second duration validation.

## Components

### VideoPicker

A simple video picker button with duration validation.

```tsx
import VideoPicker from '../components/VideoPicker';

<VideoPicker
  onVideoSelected={asset => {
    console.log('Video selected:', asset.uri);
  }}
  onError={message => {
    Alert.alert('Error', message);
  }}
  maxDuration={30}
  placeholder="Select Video"
/>;
```

### VideoPickerWithPreview

An advanced video picker with preview and duration information.

```tsx
import VideoPickerWithPreview from '../components/VideoPickerWithPreview';

<VideoPickerWithPreview
  onVideoSelected={asset => {
    console.log('Video selected:', asset.uri);
  }}
  onVideoRemoved={() => {
    console.log('Video removed');
  }}
  onError={message => {
    Alert.alert('Error', message);
  }}
  maxDuration={30}
  placeholder="Select Video (Max 30s)"
  showPreview={true}
/>;
```

## Features

- ✅ 30-second duration limit validation
- ✅ User-friendly error messages
- ✅ Video preview with duration display
- ✅ Automatic warning messages
- ✅ Consistent UI across the app
- ✅ TypeScript support

## Usage in Screens

The components have been integrated into:

- `src/screens/AthleteSide/MyChallenges/AddTraining/index.tsx`
- `src/screens/AthleteSide/UploadPost/index.tsx`

## Error Handling

The components provide user-friendly error messages for:

- Videos exceeding duration limit
- Invalid video formats
- File size issues
- General selection errors

## Customization

Both components accept style props and can be customized to match your app's design system.
