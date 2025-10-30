import { useEffect, useState } from 'react'

export default function Home() {
  const [memeBroken, setMemeBroken] = useState(false)

  // Load Tenor embed script only in browser
  useEffect(() => {
    if (typeof document === 'undefined') return
    const id = 'tenor-embed-script'
    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.src = 'https://tenor.com/embed.js'
      s.async = true
      s.id = id
      document.body.appendChild(s)
    }
  }, [])

  return (
    <main>
      <div className="container">
        <section className="hero" aria-labelledby="title">
          <h1 id="title">CODE GAMERS</h1>
          <p>Confident ah irunga Vrtri Nitchayam</p>

          {/* Simple local GIF display with graceful fallback */}
          <div style={{maxWidth:320,marginBottom:12}}>
            <img
              src="/meme.gif"
              alt="meme"
              style={{maxWidth:320,width:'100%',borderRadius:8}}
              onError={() => setMemeBroken(true)}
            />
            {memeBroken && (
              <div style={{marginTop:8,padding:10,background:'#fff7c2',borderRadius:8}}>
                <strong>Can't load /meme.gif</strong>
                <div style={{marginTop:6}}>Make sure you saved the actual GIF (right-click → Save image as...) into <code>/public/meme.gif</code>.</div>
                <div style={{marginTop:6}}><a href="https://tenor.com/view/tvk-tamilaga-vettri-kazhagam-vijay-gifs" target="_blank" rel="noreferrer">Open Tenor GIFs</a></div>
              </div>
            )}
          </div>

          {/* Tenor embed (hosted) - will render client-side if script loads */}
          <div className="tenor-gif-embed" data-postid="6678787819316051273" data-share-method="host" data-aspect-ratio="0.989011" data-width="100%" style={{marginTop:12,marginBottom:12,width:320,maxWidth:'100%'}}>
            <a href="https://tenor.com/view/tvk-tamilaga-vettri-kazhagam-vijay-vijay-latest-speech-gif-6678787819316051273">Tvk Tamilaga Vettri Kazhagam GIF</a> from <a href="https://tenor.com/search/tvk+tamilaga+vettri+kazhagam+vijay-gifs">Tenor</a>
          </div>

          <div className="swatches" aria-hidden="false">
            <div className="swatch" style={{background:'#292929'}}>
              <div className="hex">#292929</div>
            </div>
            <div className="swatch" style={{background:'#A5BF13',color:'#0b0b0b'}}>
              <div className="hex" style={{background:'rgba(255,255,255,0.85)',color:'#000'}}>#A5BF13</div>
            </div>
            <div className="swatch" style={{background:'#F0F0F0',color:'#000'}}>
              <div className="hex" style={{background:'rgba(0,0,0,0.06)',color:'#000'}}>#F0F0F0</div>
            </div>
            <div className="swatch" style={{background:'#62929E'}}>
              <div className="hex">#62929E</div>
            </div>
          </div>
          
          {/* Meme / fun image block - place an image named `meme.jpg` into the `public/` folder to display it here */}
          <figure style={{marginTop:20,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img src="/meme.jpg" alt="WAME meme" style={{maxWidth:520,width:'100%',borderRadius:12,boxShadow:'0 6px 20px rgba(0,0,0,0.12)'}} onError={(e)=>{e.currentTarget.style.opacity=0.6; e.currentTarget.nextSibling.style.display='block'}}/>
            <figcaption style={{marginTop:8,display:'none',color:'var(--wame-muted)'}}>Add a file named <code>meme.jpg</code> to the project's <code>/public</code> folder to show the image here.</figcaption>
            <div style={{marginTop:8,fontWeight:700,color:'var(--wame-dark)',fontSize:50}}>Senju · Lakshmikanthan · Nikesh · Rahul</div>
          </figure>
          <video autoPlay loop muted playsInline style={{maxWidth:520,width:'100%',borderRadius:12}}>
            <source src="/meme.webm" type="video/webm" />
            <source src="/meme.mp4" type="video/mp4" />
            <img src="/meme.gif" alt="meme fallback" style={{maxWidth:520,width:'100%'}} />
          </video>
        </section>
      </div>
    </main>
  )
}

