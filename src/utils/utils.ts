import Toast from 'react-native-toast-message';
const showToast = (
  type: 'success' | 'error' | 'info',
  text1: string,
  text2?: string,
  position: 'top' | 'bottom' = 'top',
) => {
  Toast.show({
    type,
    text1,
    text2,
    position: position,
    visibilityTime: 3000,
    autoHide: true,
    bottomOffset: 40,
  });
};
const isImage = (uri: string) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(uri);
};
const isVideo = (uri: string) => {
  return /\.(mp4|mov|avi|mkv|webm)$/i.test(uri);
};
function capitalizeWords(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
const getDuration = (challengeData: any) => {
  if (!challengeData) return '1 Week';
  if (challengeData.endDate) {
    const startDate = new Date(challengeData?.createdAt);
    const endDate = new Date(challengeData?.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) return `${diffDays} Days`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} Weeks`;
    return `${Math.ceil(diffDays / 30)} Months`;
  }

  return '1 Week';
};
const errorMessage = (error: any) => {
  return Toast.show({
    type: 'error',
    text1:
      error?.response?.data?.error ??
      error?.response?.data?.message ??
      error?.response?.data ??
      error?.request ??
      error?.message ??
      'Something went wrong',
  });
};
function convertToDays(timeString: string): number {
  if (!timeString || typeof timeString !== 'string') {
    return 0;
  }

  const normalizedString = timeString.toLowerCase().trim();

  // Extract number (default to 1 if no number specified)
  const numberMatch = normalizedString.match(/\d+/);
  const number = numberMatch ? parseInt(numberMatch[0], 10) : 1;

  // Check for different time units
  if (normalizedString.includes('day') || /^\d+$/.test(normalizedString)) {
    // Handle cases like "7", "8", "7 days", "8 days"
    return number;
  } else if (normalizedString.includes('week')) {
    return number * 7;
  } else if (normalizedString.includes('month')) {
    return number * 30;
  } else if (normalizedString.includes('year')) {
    return number * 365;
  }

  return 0;
}

export default {
  showToast,
  isImage,
  isVideo,
  capitalizeWords,
  getDuration,
  errorMessage,
  convertToDays,
};
