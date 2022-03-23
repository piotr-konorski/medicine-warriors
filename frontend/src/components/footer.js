import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faFacebookSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <>
      <div className="min-w-full bg-slate-500 py-3 flex flex-row justify-center items-center gap-4 text-white text-2xl md:text-3xl">
        <a
          href="https://www.facebook.com/MedicineWarriors.org"
          className="hover:text-gray-200"
        >
          <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
        </a>
        <a
          href="https://instagram.com/MedicineWarriors"
          className="hover:text-gray-200"
        >
          <FontAwesomeIcon icon={faInstagramSquare} size="lg" />
        </a>
        <a
          href="https://github.com/rupikon/Medicine-Warriors"
          className="hover:text-gray-200"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
      </div>

      <footer className="px-6 py-12 text-center bg-slate-800 text-white flex flex-col justify-center items-center bottom-0">
        <a href="https://medicinewarriors.org">
          <h1 className="text-xl md:text-2xl font-bold ">Medicine Warriors</h1>
          <h2 className="text-bg md:text-xl font-semibold">
            На варті Вашого здоров'я!
          </h2>
          <h3 className="text-md md:text-bg font-medium">
            We are guarding your health!
          </h3>
        </a>

        <br />
        <small>
          <div className="flex">
            Powered by&nbsp;
            <a className="inline" href="https://cloudlets.zone">
              Cloudlets.Zone
            </a>
          </div>
        </small>
      </footer>
    </>
  )
}
