import { resort } from "@/content/resort";
import type { BookingEngineConfig } from "./booking";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mamallaresort.com").replace(/\/$/, "");

/** External booking engine — null until the resort's provider URL is configured. */
export const bookingEngine: BookingEngineConfig | null = process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL
  ? {
      url: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL,
      params: {
        checkIn: process.env.NEXT_PUBLIC_BOOKING_PARAM_CHECKIN || undefined,
        checkOut: process.env.NEXT_PUBLIC_BOOKING_PARAM_CHECKOUT || undefined,
        adults: process.env.NEXT_PUBLIC_BOOKING_PARAM_ADULTS || undefined,
        children: process.env.NEXT_PUBLIC_BOOKING_PARAM_CHILDREN || undefined,
        rooms: process.env.NEXT_PUBLIC_BOOKING_PARAM_ROOMS || undefined,
      },
      dateFormat:
        process.env.NEXT_PUBLIC_BOOKING_DATE_FORMAT === "dd/mm/yyyy" ||
        process.env.NEXT_PUBLIC_BOOKING_DATE_FORMAT === "dd-mm-yyyy"
          ? process.env.NEXT_PUBLIC_BOOKING_DATE_FORMAT
          : "yyyy-mm-dd",
    }
  : null;


/** 360° tour embed: env override, otherwise the resort's Google Maps photo sphere. */
export const virtualTourUrl = process.env.NEXT_PUBLIC_VIRTUAL_TOUR_URL || resort.virtualTour.embedUrl;
