import { Tabs } from 'expo-router';
import React from 'react';

// basic tab layout for quiz app

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      {/* preview quiz tab (root route) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Preview Quiz',
        }}
      />

      {/* settings tab */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Quiz Settings',
        }}
      />
    </Tabs>
  );
}
