import { site } from '../data'
import { IconFacebook, IconInstagram, IconTwitter } from './Icons'

export function Social({ className = 'social' }: { className?: string }) {
  return (
    <div className={className}>
      <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
        <IconInstagram />
      </a>
      <a href={site.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
        <IconTwitter />
      </a>
      <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
        <IconFacebook />
      </a>
    </div>
  )
}
