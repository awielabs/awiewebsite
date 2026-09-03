import { redirect } from 'next/navigation';

export default function GemDashV2Redirect() {
  redirect('/products/gem-buddy?version=v2');
}
