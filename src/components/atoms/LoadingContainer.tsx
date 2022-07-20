import React, { memo } from 'react';
import { View, ActivityIndicator, StyleSheet, ViewProps } from 'react-native';

interface LoadingContainerProps {
  isInitial?: boolean;
  isBusy?: boolean;
  hasOverlay?: boolean;
  withIndicator?: boolean;
}

export const LoadingContainer: React.FC<LoadingContainerProps & ViewProps> =
  memo(({ children, isBusy = false, style, ...rest }) => {
    return (
      <View {...rest} style={[styles.container, style]}>
        {children}
        {isBusy && (
          <View style={[styles.indicatorContainer]}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        )}
      </View>
    );
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
