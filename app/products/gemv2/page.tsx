import { redirect } from 'next/navigation';

export default function GemV2Redirect() {
  redirect('/products/gem-buddy?version=v2');
}
