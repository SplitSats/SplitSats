// WebViewScreen.js

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";

const WebViewScreen = ({ route }) => {
  const { url } = route.params;

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
