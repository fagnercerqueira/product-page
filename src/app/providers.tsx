'use client';

import { Shippingrovider } from "@/contexts/shippingContext";

import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Shippingrovider>
      {children}
    </Shippingrovider>
  );
}