import { JSX, ReactNode, Suspense } from 'react';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import { SettingsProvider } from '@/providers/settings-provider';
import { TooltipsProvider } from '@/providers/tooltips-provider';
import { Toaster } from '@/components/ui/sonner';
import '@/css/styles.css';
import '@/components/keenicons/assets/styles.css';
import { Metadata } from 'next';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { SessionProvider } from '@/context/SessionContext';
import { BasicContextProvider } from '@/context/BasicContext';

const Inter = localFont({
  src: [
    {
      path: './fonts/Inter-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Inter-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

/**
 * Metadata for the root layout.
 */
export const metadata: Metadata = {
  title: 'Projitt',
  description: 'Generated by create next app',
};

/**
 * RootLayout component wraps the application with essential providers
 * for session, query management, settings, theme, tooltips and displays
 * the global Toaster notifications.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - The children components to render within the layout
 * @returns JSX.Element - The root layout including html and body tags with providers
 */
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  return (
    <html className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased flex h-full text-base text-foreground bg-background',
          Inter.className
        )}
      >
        <SessionProvider>
          <BasicContextProvider>
            <QueryProvider>
              <SettingsProvider>
                <ThemeProvider>
                  <TooltipsProvider>
                    <Suspense>{children}</Suspense>
                    <Toaster />
                  </TooltipsProvider>
                </ThemeProvider>
              </SettingsProvider>
            </QueryProvider>
          </BasicContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
