// URLSchemeHandler.js (or DeepLinkService.js)

import { Linking, Alert } from 'react-native';

export function setupURLHandler() {
  const handleDeepLink = async (event) => {
    const { url } = event;

    if (url && url.startsWith('nostr+walletconnect://')) {
      // Handle the URL as needed
      Alert.alert('Received URL', url);
    }
  };

  Linking.addEventListener('url', handleDeepLink);

  return () => {
    // Linking.removeEventListener('url', handleDeepLink);
  };
}
