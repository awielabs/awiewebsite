import { redirect } from 'next/navigation';

export default function GemDashV1Redirect() {
  redirect('/products/gem-buddy?version=v1');
}
