import { React, useState, useEffect } from 'react'
import Map from './components/map'
import Navbar from './components/navbar'
import Article from './components/article'
import Footer from './components/footer'

export default function App() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const [location, setLocation] = useState(null)

  useEffect(() => {
    let resizeTimer
    window.addEventListener('resize', () => {
      document.body.classList.add('resize-animation-stopper')
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper')
      }, 400)
    })
    return () => {
      window.removeEventListener('resize')
    }
  }, [])

  const [english, setEnglish] = useState(false)
  const changeLang = () => setEnglish(!english)
  return (
    <>
      <Navbar
        open={open}
        toggle={toggle}
        english={english}
        changeLang={changeLang}
      />
      <main className="pt-14">
        <Map id="map" location={location} setLocation={setLocation} />
        <Article location={location} english={english} />
        <Footer />
      </main>
    </>
  )
}
