import { GemBookingRecord } from './gemPricing';
import { supabaseAdmin } from './supabaseAdmin';

declare global {
  // eslint-disable-next-line no-var
  var __AWIE_GEM_BOOKINGS_CACHE__: Map<string, GemBookingRecord> | undefined;
}

const bookingsCache: Map<string, GemBookingRecord> =
  globalThis.__AWIE_GEM_BOOKINGS_CACHE__ || new Map();
globalThis.__AWIE_GEM_BOOKINGS_CACHE__ = bookingsCache;

/**
 * Save or update a booking in both Supabase and in-memory cache
 */
export async function saveGemBooking(booking: GemBookingRecord): Promise<GemBookingRecord> {
  const nowIso = new Date().toISOString();
  const updatedBooking: GemBookingRecord = {
    ...booking,
    updated_at: nowIso,
  };

  // 1. Cache immediately in memory
  bookingsCache.set(booking.booking_id, updatedBooking);
  if (booking.ticket_code) {
    bookingsCache.set(booking.ticket_code.toUpperCase(), updatedBooking);
  }

  // 2. Persist to Supabase if table exists
  try {
    const { data: existing } = await supabaseAdmin
      .from('gem_prebookings')
      .select('id')
      .eq('booking_id', booking.booking_id)
      .maybeSingle();

    if (existing?.id) {
      await supabaseAdmin
        .from('gem_prebookings')
        .update({
          ...updatedBooking,
          updated_at: nowIso,
        })
        .eq('id', existing.id);
    } else {
      await supabaseAdmin.from('gem_prebookings').insert({
        ...updatedBooking,
        created_at: booking.created_at || nowIso,
        updated_at: nowIso,
      });
    }
  } catch (err: any) {
    console.warn('[GEM STORE] Supabase sync skipped (table may be pending migration):', err?.message || err);
  }

  return updatedBooking;
}

/**
 * Find booking by ticket code or order ID or booking ID
 */
export async function findGemBooking(identifier: string): Promise<GemBookingRecord | null> {
  const cleanId = identifier.trim().toUpperCase();

  // Try memory cache first
  if (bookingsCache.has(cleanId)) {
    return bookingsCache.get(cleanId)!;
  }

  for (const b of bookingsCache.values()) {
    if (
      (b.ticket_code && b.ticket_code.toUpperCase() === cleanId) ||
      b.booking_id.toUpperCase() === cleanId ||
      (b.razorpay_order_id && b.razorpay_order_id === identifier) ||
      (b.final_razorpay_order_id && b.final_razorpay_order_id === identifier)
    ) {
      return b;
    }
  }

  // Try Supabase
  try {
    const { data, error } = await supabaseAdmin
      .from('gem_prebookings')
      .select('*')
      .or(`ticket_code.ilike.${cleanId},booking_id.eq.${identifier},razorpay_order_id.eq.${identifier},final_razorpay_order_id.eq.${identifier}`)
      .maybeSingle();

    if (!error && data) {
      const record = data as GemBookingRecord;
      bookingsCache.set(record.booking_id, record);
      if (record.ticket_code) {
        bookingsCache.set(record.ticket_code.toUpperCase(), record);
      }
      return record;
    }
  } catch (err: any) {
    console.warn('[GEM STORE] Database lookup notice:', err?.message || err);
  }

  return null;
}

/**
 * Get all bookings for admin dashboard
 */
export async function getAllGemBookings(): Promise<GemBookingRecord[]> {
  const map = new Map<string, GemBookingRecord>();

  // Load from Supabase if table exists
  try {
    const { data, error } = await supabaseAdmin
      .from('gem_prebookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      for (const item of data) {
        map.set(item.booking_id, item as GemBookingRecord);
      }
    }
  } catch (err: any) {
    console.warn('[GEM STORE] Database read notice:', err?.message || err);
  }

  // Merge with memory cache
  for (const item of bookingsCache.values()) {
    if (!map.has(item.booking_id)) {
      map.set(item.booking_id, item);
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    const tA = new Date(a.created_at || 0).getTime();
    const tB = new Date(b.created_at || 0).getTime();
    return tB - tA;
  });
}
