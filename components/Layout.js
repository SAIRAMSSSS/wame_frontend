import Link from 'next/link'
import { useState } from 'react'
import Footer from './Footer'

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const toggle = () => setOpen((v) => !v)
  const toggleMore = (e) => { e && e.stopPropagation(); setMoreOpen((v) => !v) }

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--wame-bg)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header / Nav */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="site-brand">
            <img src="/yultimate-logo.png" alt="Y-Ultimate Logo" />
            <span>Y-Ultimate</span>
          </Link>

          <div className="nav">
            <button
              className="nav-toggle mobile-only"
              aria-expanded={open}
              aria-controls="primary-navigation"
              onClick={toggle}
              title="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div id="primary-navigation" className={`nav-links ${open ? 'open' : 'mobile-hidden'}`} onClick={() => { setOpen(false); setMoreOpen(false); }}>
              <Link href="/" className="nav-link">HOME</Link>
              <Link href="/tracking" className="nav-link">TRACK</Link>
              <Link href="/tools" className="nav-link">TOOLS</Link>
              <Link href="/resource" className="nav-link">RESOURCES</Link>

              {/* More dropdown contains less-frequent links to keep header short */}
              <div className="more-menu" onClick={(e) => e.stopPropagation()}>
                <button
                  className="more-button"
                  aria-expanded={moreOpen}
                  aria-haspopup="menu"
                  onClick={toggleMore}
                  title="More"
                >
                  More
                </button>

                <div className={`more-list ${moreOpen ? 'open' : ''}`} role="menu" aria-hidden={!moreOpen}>
                  <Link href="/student-coach" className="nav-link" role="menuitem">STUDENT/COACH</Link>
                  <Link href="/tournament-overview" className="nav-link" role="menuitem">TOURNAMENTS</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
