'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TICKER_ITEMS = ['MUSIC', 'COMEDY', 'POETRY', 'THEATRE']
const PROOF_ROWS = [
  { num: '52',  city: 'Fans Want You in Mumbai',       genre: 'Independent music · this week',    status: 'stb', label: 'Building ↑', cls: 'pr1' },
  { num: '117', city: 'Fans Ready in Delhi',            genre: 'Stand-up comedy · waiting',        status: 'stw', label: 'Waiting',    cls: 'pr2' },
  { num: '38',  city: 'People Want You in Bengaluru',   genre: 'Poetry · growing',   status: 'stg', label: 'Growing ↑', cls: 'pr3' },
  { num: '8',   city: 'Seats Left · Pune · Nov 14',     genre: 'Theatre · show confirmed',         status: 'stl', label: 'Live Now ✦', cls: 'pr4' },
]
const STEPS = [
  { n: '01', title: 'Get Your Signal Link',        body: 'Sign up. We send it directly.' },
  { n: '02', title: 'Share It With Your Audience', body: 'Story. Bio. WhatsApp. Done.' },
  { n: '03', title: 'See Real Numbers',             body: 'Watch demand build in real time.' },
  { n: '04', title: 'Plan Your Show',              body: 'Venue, date, price — based on real data.' },
]

export default function HomePage() {
  const [form, setForm]         = useState({ name: '', phone: '', instagram: '', city: '' })
  const [genre, setGenre]       = useState('')
  const [otherGenre, setOther]  = useState('')
  const [willShare, setShare]   = useState('')
  const [submitted, setDone]    = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [slug, setSlug] = useState('')

  const handleSubmit = async () => {
    const { name, phone, instagram, city } = form
    const finalGenre = genre === 'other' ? otherGenre : genre
    if (!name || !phone || !instagram || !city || !finalGenre || !willShare) {
      setError('Please fill in all fields.'); return
    }
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, instagram, city, genre: finalGenre, will_share: willShare }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      const generatedSlug = `${form.name}-${genre === 'other' ? otherGenre : genre}`
  .toLowerCase()
  .replace(/\s+/g, '-')

setSlug(generatedSlug)
setDone(true)
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── NAV ── */}
      <nav>
        <div>
          <div className="nl">ROOTD<em>.</em>LIVE</div>
          <div className="nr" />
        </div>
        <div className="ntag">India · Early Access Open</div>
        <Link href="#join" className="ncta">Get Your Signal Link</Link>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hbg">
          <Image src="/images/hero-kalakaar.jpg" alt="Kalakaar" fill priority style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,#0D0B1A 0%,rgba(13,11,26,.25) 30%,rgba(13,11,26,0) 70%),linear-gradient(to bottom,rgba(13,11,26,.3) 0%,transparent 20%,transparent 80%,#0D0B1A 100%)' }} />
        </div>
        <div className="hc">
          <div className="eyebrow">For Independent Artists</div>
          <h1>
            <span className="l1">DON&apos;T</span>
            <span className="l2">PERFORM TO</span>
            <span className="l3">EMPTY ROOMS.</span>
          </h1>
          <p className="hsub">
            Thousands of artists don&apos;t perform — not because they lack talent,
            but because they don&apos;t know if people will show up.
          </p>
          <div className="hpower">Most artists guess. You don&apos;t have to.</div>
          <div className="hcta">
            <Link href="#join" className="btn-red">Get Your Signal Link →</Link>
            <div className="hcta-note">
              Once you sign up, you&apos;ll get a link to <strong>share with your audience.</strong> Real demand. Before you book anything.
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ti">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── FORM ── */}
      <div className="form-wrap" id="join">
        <div className="fi">
          <div>
            <div className="flbl">Grow with Rootd.Live</div>
            <div className="ftitle">GET YOUR<br />SIGNAL<br /><em>LINK.</em></div>
            <p className="fdesc">Create your signal link. Share it. See real interest.</p>
          </div>

          <div>
            {!submitted ? (
              <div className="fwrap" id="fw">
                <div className="field">
                  <label>Stage name or artist name</label>
                  <input type="text" placeholder="What do you go by on stage?" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="field">
                  <label>Phone number</label>
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="field">
                  <label>Instagram handle</label>
                  <input type="text" placeholder="@yourhandle" value={form.instagram} onChange={e => setForm(p => ({ ...p, instagram: e.target.value }))} />
                </div>
                <div className="field">
                  <label>City</label>
                  <input type="text" placeholder="Mumbai, Delhi, Bengaluru..." value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} />
                  <div className="fnote">Starting in <strong>Mumbai</strong> — other cities joining soon. Sign up from anywhere.</div>
                </div>
                <div className="field">
                  <label>Your art form</label>
                  <select value={genre} onChange={e => setGenre(e.target.value)}>
                    <option value="" disabled>Select your art form</option>
                    <option value="Music">Music</option>
                    <option value="Stand-up Comedy">Stand-up Comedy</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Theatre">Theatre</option>
                    <option value="other">Other</option>
                  </select>
                  {genre === 'other' && (
                    <div className="ofield show" style={{ marginTop: '8px' }}>
                      <input type="text" placeholder="Tell us your art form" value={otherGenre} onChange={e => setOther(e.target.value)} />
                    </div>
                  )}
                </div>
                <div className="sqwrap">
                  <span className="sqlbl">Would you share your signal link with your followers?</span>
                  <div className="rrow">
                    {[{ v: 'yes', label: 'Yes, definitely' }, { v: 'maybe', label: 'Maybe' }, { v: 'unsure', label: 'Not sure' }].map(({ v, label }) => (
                      <div className="ro" key={v}>
                        <input type="radio" name="share" id={`s-${v}`} value={v} checked={willShare === v} onChange={() => setShare(v)} />
                        <label htmlFor={`s-${v}`}>{label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {error && <p style={{ color: 'var(--red)', fontSize: '.82rem', marginTop: '14px' }}>{error}</p>}
                <button className="bsub" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Sending...' : 'Get Your Signal Link →'}
                </button>
                <p className="fnotebot">No spam · Free to join · Signal, Not Just Hype</p>
              </div>
            ) : (
              <div className="ss show">
                <div className="sshl">YOUR LINK IS LIVE</div>

  <p className="ssbody">
    Share this with your audience.
  </p>

  <div style={{
    background: '#111',
    padding: '10px',
    marginTop: '20px',
    marginBottom: '10px',
    fontSize: '12px'
  }}>
    {`https://rootd.live/a/${slug}`}
  </div>

  <button
    onClick={() => navigator.clipboard.writeText(`https://rootd.live/a/${slug}`)}
    style={{
      background: '#DDFF00',
      padding: '10px',
      border: 'none',
      cursor: 'pointer'
    }}
  >
    Copy Link
  </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── PAIN ── */}
      <section className="pain" id="why">
        <div className="pbg">
          <Image src="/images/pain-musician.jpg" alt="" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,#0A0818 0%,rgba(10,8,24,.85) 45%,rgba(10,8,24,.1) 100%)' }} />
        </div>
        <div className="pain-inner">
          <div>
            <div className="pain-quote">
              You prepared<br />for months.<br />
              <span className="pqt">11 people showed up.</span>
              <span className="pqf">NEVER AGAIN.</span>
            </div>
          </div>
          <ul className="plist">
            {[
              { bad: true,  text: <>Booking a venue and <strong>hoping</strong> the crowd shows up</> },
              { bad: true,  text: <>Spending on promotion <strong>before knowing</strong> if there&apos;s demand</> },
              { bad: true,  text: <>Setting ticket prices by <strong>gut feel</strong> and getting it wrong</> },
              { bad: false, text: <>Your fans <strong>signal they&apos;re coming</strong> — before the show exists</> },
              { bad: false, text: <>See <strong>real numbers first</strong> — then decide venue, date, and price</> },
              { bad: false, text: <>Every show you do is one your audience <strong>actually wanted</strong></> },
            ].map((item, i) => (
              <li className="pitem" key={i}>
                <div className={`pi ${item.bad ? 'pibad' : 'pigood'}`}>{item.bad ? '✕' : '✓'}</div>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how">
        <div className="how-bg">
          <Image src="/images/how-skater.jpg" alt="" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,11,26,.15)' }} />
        </div>
        <div className="how-in">
          <div className="slbl">How It Works</div>
          <div className="how-title">FOUR STEPS.<br /><em>FULL ROOM.</em></div>
          <div className="hsteps">
            {STEPS.map(step => (
              <div className="hstep" key={step.n}>
                <span className="hsnum">{step.n}</span>
                <div className="hstitle">{step.title}</div>
                <p className="hsbody">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF ── */}
      <div className="proof" id="proof">
        <div className="proof-bg">
          <Image src="/images/proof-trumpet.jpg" alt="" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,var(--bg) 0%,rgba(13,11,26,.7) 55%,rgba(13,11,26,.2) 100%)' }} />
        </div>
        <div className="ph">
          <div>
            <div className="slbl" style={{ marginBottom: '12px' }}>What Demand Looks Like</div>
            <div className="ptitle">THIS IS WHAT<br /><em>DEMAND</em> LOOKS LIKE.</div>
          </div>
          <div className="pdisc">Example demand signals —<br />real numbers from your<br />audience once you&apos;re live</div>
        </div>
        <div className="prows">
          {PROOF_ROWS.map(row => (
            <div className={`prow ${row.cls}`} key={row.num}>
              <div className="prnum">{row.num}</div>
              <div className="prinfo">
                <div className="prcity">{row.city}</div>
                <div className="prgenre">{row.genre}</div>
              </div>
              <div className={`prstatus ${row.status}`}>{row.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LOGO STRIP ── */}
      <div className="ls">
        <div className="lsi">
          {Array(12).fill('ROOTD.LIVE').map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="flogo">ROOTD<em>.</em>LIVE</div>
        <div className="fnav">India · Built for independent artists · 2026</div>
        <div className="fnav">Signal, Not Just Hype.</div>
      </footer>
    </>
  )
}
