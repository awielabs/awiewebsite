import { redirect } from 'next/navigation';

export default function GemV1Redirect() {
  redirect('/products/gem-buddy?version=v1');
}
