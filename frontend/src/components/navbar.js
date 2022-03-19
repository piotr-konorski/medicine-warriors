import logo from '../assets/logo.svg'
import { options } from './navbar-options'

function Toggle(props) {
  return (
    <>
      <div
        {...props}
        className="min-h-full px-4 flex flex-col items-center justify-center gap-1 cursor-pointer md:hidden md:justify-center"
      >
        <div className="w-6 h-[2px] bg-black" />
        <div className="w-6 h-[2px] bg-black" />
        <div className="w-6 h-[2px] bg-black" />
      </div>
    </>
  )
}

function Navbar(props) {
  return (
    <>
      <nav className="fixed top-0 min-w-full h-14 bg-white flex justify-between items-center font-bold border-b-[1px] border-solid z-50">
        <a href="http://www.medicinewarriors.org">
          <div className="max-h-full flex flex-row items-center text-xs w-full">
            <img
              className="max-h-full max-w-[50px] w-auto h-auto"
              src={logo}
              alt="Medicine Warriors"
            />
            <span className="text-slate-900">Medicine Warriors</span>
          </div>
        </a>
        <Toggle onClick={props.toggle} />
        <div
          className={`${
            props.open ? '' : 'translate-x-full '
          }fixed md:relative top-14 md:top-0 right-0 w-7/12 md:w-auto transition-transform z-50 bg-white md:translate-x-0 `}
        >
          <ul className="text-md border-l-[1px] md:border-none border-solid font-normal md:flex">
            {options.map((option) => (
              <li
                className="p-4 md:py-2 border-b-[1px] md:border-none md:rounded-md hover:bg-gray-100"
                style={{ cursor: 'pointer' }}
                key={option.name}
                onClick={() => {
                  props.toggle()
                  const anchor = document.querySelector(`#${option.id}`)
                  window.scrollTo({
                    behavior: 'smooth',
                    top: anchor.offsetTop - 56, // 56 is the height of the navbar
                  })
                }}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
