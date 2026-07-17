import { permanentRedirect } from 'next/navigation'

export default function Videos() {
  permanentRedirect('/posts')
}
