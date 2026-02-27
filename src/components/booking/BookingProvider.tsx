"use client";

import React, { createContext, useCallback, useMemo, useState } from "react";

export type BookingSource = "navbar" | "hero" | "sticky" | "footer" | "other";

export type BookingOpenPayload = {
  source?: BookingSource;
};

type BookingContextValue = {
  isOpen: boolean;
  source: BookingSource | null;
  openBooking: (payload?: BookingOpenPayload) => void;
  closeBooking: () => void;
  toggleBooking: (payload?: BookingOpenPayload) => void;
};

export const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<BookingSource | null>(null);

  const openBooking = useCallback((payload?: BookingOpenPayload) => {
    setSource(payload?.source ?? "other");
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleBooking = useCallback((payload?: BookingOpenPayload) => {
    setSource(payload?.source ?? "other");
    setIsOpen((v) => !v);
  }, []);

  const value = useMemo(
    () => ({ isOpen, source, openBooking, closeBooking, toggleBooking }),
    [isOpen, source, openBooking, closeBooking, toggleBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}