import React, { useEffect,  useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { l } from '@src/logger';
import { useFocusEffect } from '@react-navigation/native';
import { useNWCContext } from '@src/context/NWCContext';
import Header from "@comps/Header";

const WebViewScreen = ({ navigation }) => {
  const { nwcUrl,
    setNwcUrl,
    pendingNwcUrl,
    setPendingNwcUrl,
    nwcAuthUrl,
    setNwcAuthUrl,
    nostrWebLN,
    setNostrWebLN, } = useNWCContext();

  const handleWebViewMessage = (event) => {
    if (event.nativeEvent.data === 'nwc:success') {
      l('nwc:success');
      setNwcAuthUrl('');
      setNwcUrl(pendingNwcUrl);
      navigation.goBack();
    }
  };
  
  const handleBack = () => {
    navigation.navigate('WalletScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="NWC Alby" onPressBack={handleBack} />

      <WebView
        source={{ uri: nwcAuthUrl }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
        }}
        onLoad={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          if (!nativeEvent.loading) {
            console.log('WebView loaded: ', nativeEvent);
            if (nativeEvent['canGoBack']) {
              navigation.goBack();
            }
          }
        }}
        injectedJavaScriptBeforeContentLoaded={`
          window.addEventListener("message", (event) => {
            window.ReactNativeWebView.postMessage(event.data?.type);
          });
        `}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
