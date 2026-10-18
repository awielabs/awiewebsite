import fs from 'fs/promises';
import path from 'path';

export type GiftStatus = 'order_placed' | 'packed' | 'in_transit' | 'out_for_delivery' | 'delivered';

export interface StatusHistoryEntry {
  status: GiftStatus;
  title: string;
  description: string;
  timestamp: string;
}

export interface LarissaGiftOrder {
  id: string;
  trackingCode: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  note?: string;
  status: GiftStatus;
  statusTitle: string;
  statusMessage: string;
  courierPartner?: string;
  courierAwb?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  history: StatusHistoryEntry[];
}

const DATA_FILE = path.join(process.cwd(), 'data', 'larissa-gifts.json');

// In-memory fallback cache
let memoryStore: LarissaGiftOrder[] = [];

export const STATUS_METADATA: Record<GiftStatus, { title: string; defaultMessage: string; stepNumber: number }> = {
  order_placed: {
    title: 'Order Received & Confirmed ✨',
    defaultMessage: 'Your birthday framed portrait order has been safely recorded and queued for framing.',
    stepNumber: 1
  },
  packed: {
    title: 'Gift is Packed 🎁',
    defaultMessage: 'Your custom framed recreation portrait has been handcrafted and sealed inside a luxury gift box.',
    stepNumber: 2
  },
  in_transit: {
    title: 'In Transit 🚚',
    defaultMessage: 'Your gift package has departed the dispatch hub and is travelling rapidly your way.',
    stepNumber: 3
  },
  out_for_delivery: {
    title: 'Out for Delivery (Reaching Today) 🛵',
    defaultMessage: 'Package is out with the delivery agent and will reach your doorstep today! Please keep your phone handy.',
    stepNumber: 4
  },
  delivered: {
    title: 'Received by Larissa 💖',
    defaultMessage: 'Package has been safely received with love! Wishing Larissa the happiest 21st birthday celebration!',
    stepNumber: 5
  }
};

async function readStore(): Promise<LarissaGiftOrder[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      memoryStore = parsed;
      return parsed;
    }
  } catch (err: any) {
    if (err?.code !== 'ENOENT') {
      console.warn('[LARISSA_GIFT_STORE] Could not read gifts file, falling back to memory store:', err);
    }
  }
  return memoryStore;
}

async function writeStore(orders: LarissaGiftOrder[]): Promise<void> {
  memoryStore = orders;
  try {
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[LARISSA_GIFT_STORE] Could not persist gifts file, kept in memory:', err);
  }
}

export async function getAllGiftOrders(): Promise<LarissaGiftOrder[]> {
  const orders = await readStore();
  return [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getGiftOrderByCode(code: string): Promise<LarissaGiftOrder | null> {
  if (!code) return null;
  const orders = await readStore();
  const normalized = code.trim().toUpperCase();
  const match = orders.find(
    (o) => o.trackingCode.toUpperCase() === normalized || o.id.toUpperCase() === normalized
  );
  return match || null;
}

export async function saveGiftOrder(data: {
  trackingCode: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  note?: string;
}): Promise<LarissaGiftOrder> {
  const orders = await readStore();
  const existingIndex = orders.findIndex(
    (o) => o.trackingCode.toUpperCase() === data.trackingCode.toUpperCase()
  );

  const now = new Date().toISOString();
  const meta = STATUS_METADATA.order_placed;

  if (existingIndex >= 0) {
    const existing = orders[existingIndex];
    const updated: LarissaGiftOrder = {
      ...existing,
      ...data,
      updatedAt: now
    };
    orders[existingIndex] = updated;
    await writeStore(orders);
    return updated;
  }

  const initialOrder: LarissaGiftOrder = {
    id: `LRS-${Date.now()}`,
    trackingCode: data.trackingCode,
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    note: data.note || '',
    status: 'order_placed',
    statusTitle: meta.title,
    statusMessage: meta.defaultMessage,
    estimatedDelivery: 'Preparing for courier dispatch',
    createdAt: now,
    updatedAt: now,
    history: [
      {
        status: 'order_placed',
        title: meta.title,
        description: meta.defaultMessage,
        timestamp: now
      }
    ]
  };

  orders.unshift(initialOrder);
  await writeStore(orders);
  return initialOrder;
}

export async function updateGiftOrderStatus(
  trackingCode: string,
  newStatus: GiftStatus,
  options?: {
    customNote?: string;
    courierPartner?: string;
    courierAwb?: string;
    estimatedDelivery?: string;
  }
): Promise<LarissaGiftOrder | null> {
  const orders = await readStore();
  const normalized = trackingCode.trim().toUpperCase();
  const index = orders.findIndex(
    (o) => o.trackingCode.toUpperCase() === normalized || o.id.toUpperCase() === normalized
  );

  if (index === -1) return null;

  const order = orders[index];
  const meta = STATUS_METADATA[newStatus] || STATUS_METADATA.order_placed;
  const now = new Date().toISOString();

  const finalMessage = options?.customNote?.trim() || meta.defaultMessage;

  const historyEntry: StatusHistoryEntry = {
    status: newStatus,
    title: meta.title,
    description: finalMessage,
    timestamp: now
  };

  const updated: LarissaGiftOrder = {
    ...order,
    status: newStatus,
    statusTitle: meta.title,
    statusMessage: finalMessage,
    courierPartner: options?.courierPartner !== undefined ? options.courierPartner.trim() : order.courierPartner,
    courierAwb: options?.courierAwb !== undefined ? options.courierAwb.trim() : order.courierAwb,
    estimatedDelivery: options?.estimatedDelivery !== undefined ? options.estimatedDelivery.trim() : order.estimatedDelivery,
    updatedAt: now,
    history: [historyEntry, ...order.history.filter((h) => h.status !== newStatus)]
  };

  orders[index] = updated;
  await writeStore(orders);
  return updated;
}
