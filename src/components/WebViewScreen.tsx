// WebViewScreen.js
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
import { l } from '@src/logger';

const WebViewScreen = ({ navigation, route }) => {
  const { url, pendingNwcUrl, setNwcUrl, setNwcAuthUrl } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: url }}
        injectedJavaScriptBeforeContentLoaded={`
          window.addEventListener("message", (event) => {
            window.ReactNativeWebView.postMessage(event.data?.type);
          });
        `}
        onMessage={(event) => {
          if (event.nativeEvent.data === 'nwc:success') {
            // Handle success event if needed
            l('nwc:success');
            setNwcAuthUrl("");
            setNwcUrl(pendingNwcUrl);
          }
        }}
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
