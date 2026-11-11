import { STATUS_FLOW, STATUS_LABEL } from '../types/order';
import { ShirtType } from '../types/shirt';
import { shirtTemplates } from './shirtTemplates';

// Isi halaman Bantuan. Dipakai oleh app/(info)/bantuan/index.tsx dan [...slug].tsx.
export type HelpLink = { label: string; href: string };
export type HelpPage = { title: string; body: string[]; links?: HelpLink[] };

export const helpTopics: HelpLink[] = [
  { label: 'Cara Memesan', href: '/bantuan/cara-pesan' },
  { label: 'Panduan Ukuran', href: '/bantuan/ukuran' },
  { label: 'Arti Status Pesanan', href: '/bantuan/status' },
];

const MODEL_LABEL: Record<ShirtType, string> = { regular: 'Regular', oversize: 'Oversize' };
const isModel = (v?: string): v is ShirtType => v === 'regular' || v === 'oversize';

// Ukuran diambil dari data template yang sama dengan halaman Pilih Baju (bukan data karangan).
const sizesOf = (type: ShirtType) => [
  ...new Set(shirtTemplates.filter((t) => t.type === type).flatMap((t) => t.availableSizes)),
];

// slug = array path setelah /bantuan, misal ['ukuran', 'regular'] untuk /bantuan/ukuran/regular.
export function resolveHelp(slug: string[]): HelpPage | null {
  const [topic, sub, ...rest] = slug;
  if (rest.length > 0) return null;

  if (topic === 'cara-pesan' && !sub) {
    return {
      title: 'Cara Memesan',
      body: [
        '1. Tekan "Mulai Design", lalu pilih model, warna, dan ukuran kaos.',
        '2. Upload desain dari galeri (PNG, JPG, atau JPEG).',
        '3. Atur posisi dan ukuran desain pada mockup.',
        '4. Isi data pemesan, lalu kirim pesanan.',
        '5. Pantau perkembangan pesanan di menu "Pesanan Saya".',
      ],
    };
  }

  if (topic === 'status' && !sub) {
    return {
      title: 'Arti Status Pesanan',
      body: STATUS_FLOW.map((st, i) => `${i + 1}. ${STATUS_LABEL[st]}`),
    };
  }

  if (topic === 'ukuran') {
    if (!sub) {
      return {
        title: 'Panduan Ukuran',
        body: ['Pilih model kaos untuk melihat ukuran yang tersedia.'],
        links: (Object.keys(MODEL_LABEL) as ShirtType[]).map((t) => ({
          label: `Kaos ${MODEL_LABEL[t]}`,
          href: `/bantuan/ukuran/${t}`,
        })),
      };
    }
    if (isModel(sub)) {
      return {
        title: `Ukuran Kaos ${MODEL_LABEL[sub]}`,
        body: [`Ukuran tersedia: ${sizesOf(sub).join(', ')}.`, 'Warna tersedia: Black dan White.'],
        links: [{ label: 'Lihat Panduan Ukuran', href: '/bantuan/ukuran' }],
      };
    }
  }
  return null;
}
