import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Integrity Wiki team. Contact us for feedback, data inquiries, support, or security reports.',
}

export default function ContactPage() {
  return (
    <div className="container animate-fade-in" style={{ maxWidth: 640 }}>
      <h1 className="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        Contact Us
      </h1>
      
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Questions or Feedback?</h2>
        <p className="text-secondary" style={{ marginBottom: '1.5rem' }}>
          We welcome contributions, corrections, bug reports, and general suggestions to make The Integrity Wiki a more complete and accurate resource for tracking campaign finance and political integrity.
        </p>
        
        <div style={{ padding: '1.25rem', background: 'var(--bg-primary)', border: '2px solid var(--border-color)', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>📬 Direct Inquiry Email</h3>
          <p style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: '1.125rem', wordBreak: 'break-all' }}>
            kaiserenior@gmail.com
          </p>
        </div>

        <div style={{ padding: '1.25rem', background: 'var(--bg-primary)', border: '2px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>💬 Join Discord Server</h3>
          <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            You can also join the Integrity Project Discord server (our sister community) to give feedback and discuss with other contributors.
          </p>
          <a
            id="discord-invite-link"
            href="https://discord.gg/Nvup6QG4Es"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block',
              fontFamily: 'Space Mono, monospace',
              fontWeight: 700,
              fontSize: '1.0625rem',
              color: 'var(--accent-secondary)',
              textDecoration: 'underline'
            }}
          >
            discord.gg/Nvup6QG4Es
          </a>
        </div>
        
        <p className="text-secondary" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          For inquiries related to candidate verification, data disputes, account moderation, or open-source development, drop us an email and we will review your message as soon as possible.
        </p>
        
        <a
          id="email-contact-link"
          href="mailto:kaiserenior@gmail.com"
          className="btn btn-primary"
          style={{ width: '100%', textDecoration: 'none' }}
        >
          Send an Email
        </a>
      </div>
    </div>
  )
}
