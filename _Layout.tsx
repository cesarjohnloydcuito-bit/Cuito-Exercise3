import React from 'react';
import QuizProvider from './_context/_QuizContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <QuizProvider>{children}</QuizProvider>;
}
