import { React, useState } from 'react'
import { useEffect } from 'react'
import Map from './components/map'
import Navbar from './components/navbar'
import Article from './components/article'
import Footer from './components/footer'

export default function App() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)
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
  return (
    <>
      <Navbar open={open} toggle={toggle} />
      <main className="pt-14">
        <Map id="map" />
        <Article />
        <Footer />
      </main>
    </>
  )
}
