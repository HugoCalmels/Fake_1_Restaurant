"use client";

import React from "react";
import { useBooking } from "./useBooking";
import type { BookingSource } from "./BookingProvider";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  source?: BookingSource;
};

export default function BookingLauncher({ source = "other", onClick, ...props }: Props) {
  const { openBooking } = useBooking();

  return (
    <button
      {...props}
      type={props.type ?? "button"}
      onClick={(e) => {
        onClick?.(e);
        openBooking({ source });
      }}
    />
  );
}