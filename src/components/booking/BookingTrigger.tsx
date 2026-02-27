"use client";

import type React from "react";
import { useBooking } from "./useBooking";
import type { BookingSource } from "./BookingProvider";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  source?: BookingSource;
};

export default function BookingTrigger({ source = "other", onClick, ...rest }: Props) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        openBooking({ source });
      }}
      {...rest}
    />
  );
}