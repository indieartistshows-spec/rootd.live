'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const [genre, setGenre] = useState('')
  const [willShare, setWillShare] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    phone: '',
    instagram: '',
    city: '',
  })

  const handleSubmit = async () => {
    const { name, phone, instagram, city } = form
    if (!name || !phone || !instagram || !city || !genre || !willShare) {
      setError('Please fill in all fields.')
      return
    }
    if (genre === 'other' && !form.city) {
      setError('Please tell us your art form.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, instagram, city, genre, will_share: willShare }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <div>
          <div className="nl">ROOTD<em>.</em>LIVE</div>
          <div className="nr"></div>
        </div>
        <div className="ntag">India · Early Access Open</div>
        <Link href="#join" className="ncta">Get Your Signal Link</Link>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hbg">
          <Image
            src="/images/hero-kalakaar.jpg"
            alt="Kalakaar — artist"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right,#0D0B1A 0%,rgba(13,11,26,.25) 30%,rgba(13,11,26,0) 70%),linear-gradient(to bottom,rgba(13,11,26,.3) 0%,transparent 20%,transparent 80%,#0D0B1A 100%)'
          }} />
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

        <div className="hstats">
          <div className="hs">
            <div className="hs-n">3–8<em>%</em></div>
            <div>
              <div className="hs-s">Most Don&apos;t Perform</div>
              <div className="hs-sub">Not lack of talent — lack of signal</div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ti">
          <span>MUSIC</span><span>COMEDY</span><span>SPOKEN WORD</span><span>POETRY</span><span>THEATRE</span>
          <span>MUSIC</span><span>COMEDY</span><span>SPOKEN WORD</span><span>POETRY</span><span>THEATRE</span>
          <span>MUSIC</span><span>COMEDY</span><span>SPOKEN WORD</span><span>POETRY</span><span>THEATRE</span>
          <span>MUSIC</span><span>COMEDY</span><span>SPOKEN WORD</span><span>POETRY</span><span>THEATRE</span>
        </div>
      </div>

      {/* ══ FORM ══ */}
      <div className="form-wrap" id="join">
        <div className="fi">
          <div>
            <div className="flbl">Join Rootd Live</div>
            <div className="ftitle">GET YOUR<br />SIGNAL<br /><em>LINK.</em></div>
            <p className="fdesc">Create your signal link. Share it. See real interest.</p>
            <p className="fdesc" style={{ color: 'rgba(245,240,255,0.35)', fontSize: '.82rem', marginTop: '-12px', fontWeight: 300 }}>
              You&apos;ll start seeing real demand as people sign up.
            </p>
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
                    <option value="Spoken Word / Poetry">Spoken Word / Poetry</option>
                    <option value="Theatre">Theatre</option>
                    <option value="other">Other</option>
                  </select>
                  {genre === 'other' && (
                    <div className="ofield show">
                      <input type="text" placeholder="Tell us your art form" onChange={e => setGenre(e.target.value)} />
                    </div>
                  )}
                </div>
                <div className="sqwrap">
                  <span className="sqlbl">Would you share your signal link with your followers?</span>
                  <div className="rrow">
                    {['yes', 'maybe', 'unsure'].map(v => (
                      <div className="ro" key={v}>
                        <input type="radio" name="share" id={`s-${v}`} value={v} checked={willShare === v} onChange={() => setWillShare(v)} />
                        <label htmlFor={`s-${v}`}>{v === 'yes' ? 'Yes, definitely' : v === 'maybe' ? 'Maybe' : 'Not sure'}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {error && <p style={{ color: 'var(--red)', fontSize: '.82rem', marginTop: '12px' }}>{error}</p>}
                <button className="bsub" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Sending...' : 'Get Your Signal Link →'}
                </button>
                <p className="fnotebot">No spam · Free to join · Just signal, not just hype</p>
              </div>
            ) : (
              <div className="ss show">
                <div className="sshl">YOU&apos;RE IN.</div>
                <p className="ssbody">
                  We&apos;ll send your signal link directly.<br /><br />
                  The moment you share it — <strong>the numbers start moving.</strong>
                </p>
                <div className="ssnext">
                  <strong>What&apos;s next:</strong><br />
                  Share on Instagram story + WhatsApp.<br />
                  Once people show interest, you&apos;ll see real demand.<br />
                  That&apos;s when things get real.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ PAIN ══ */}
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
            <div className="iv">
              <div className="iv-lbl">You&apos;ve thought this before:</div>
              <div className="iv-q">&ldquo;Will anyone actually show up?&rdquo;</div>
              <div className="iv-q">&ldquo;Should I even book this?&rdquo;</div>
              <div className="iv-q">&ldquo;What if the room is empty?&rdquo;</div>
            </div>
          </div>
          <ul className="plist">
            {[
              { bad: true, text: <>Booking a venue and <strong>hoping</strong> the crowd shows up</> },
              { bad: true, text: <>Spending on promotion <strong>before knowing</strong> if there&apos;s demand</> },
              { bad: true, text: <>Setting ticket prices by <strong>gut feel</strong> and getting it wrong</> },
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

      {/* ══ HOW IT WORKS ══ */}
      <section className="how" id="how">
        <div className="how-bg">
          <Image src="/images/how-skater.jpg" alt="" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,11,26,.15)' }} />
        </div>
        <div className="how-in">
          <div className="slbl">How It Works</div>
          <div className="how-title">FOUR STEPS.<br /><em>FULL ROOM.</em></div>
          <div className="hsteps">
            {[
              { n: '01', title: 'Get Your Signal Link', body: 'Sign up. We send it directly.' },
              { n: '02', title: 'Share It With Your Audience', body: 'Story. Bio. WhatsApp. Done.' },
              { n: '03', title: 'See Real Numbers', body: 'Watch demand build in real time.' },
              { n: '04', title: 'Plan Your Show', body: 'Venue, date, price — based on real data.' },
            ].map(step => (
              <div className="hstep" key={step.n}>
                <span className="hsnum">{step.n}</span>
                <div className="hstitle">{step.title}</div>
                <p className="hsbody">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROOF ══ */}
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
          {[
            { n: '52', city: 'Fans Want You in Mumbai', genre: 'Independent music · this week', status: 'stb', label: 'Building ↑', cls: 'pr1' },
            { n: '117', city: 'Fans Ready in Delhi', genre: 'Stand-up comedy · waiting', status: 'stw', label: 'Waiting', cls: 'pr2' },
            { n: '38', city: 'People Want You in Bengaluru', genre: 'Spoken word / poetry · growing', status: 'stg', label: 'Growing ↑', cls: 'pr3' },
            { n: '8', city: 'Seats Left · Pune · Nov 14', genre: 'Theatre · show confirmed', status: 'stl', label: 'Live Now ✦', cls: 'pr4' },
          ].map(row => (
            <div className={`prow ${row.cls}`} key={row.n}>
              <div className="prnum">{row.n}</div>
              <div className="prinfo">
                <div className="prcity">{row.city}</div>
                <div className="prgenre">{row.genre}</div>
              </div>
              <div className={`prstatus ${row.status}`}>{row.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* LOGO STRIP */}
      <div className="ls">
        <div className="lsi">
          {Array(12).fill('ROOTD.LIVE').map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="flogo">ROOTD<em>.</em>LIVE</div>
        <div className="fnav">India · Built for independent artists · 2026</div>
        <div className="fnav">Just signal, not just hype.</div>
      </footer>
    </>
  )
}
