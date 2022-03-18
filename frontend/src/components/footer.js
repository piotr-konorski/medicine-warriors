export default function Footer() {
  return (
    <footer className="px-6 py-12 text-center bg-slate-800 text-white flex flex-col justify-center items-center bottom-0">
      {/* <div className="max-w-2xl"> */}
      <a href="https://medicinewarriors.org">
        <h1 className="text-xl md:text-2xl font-bold ">Medicine Warriors</h1>
        <h2 className="text-bg md:text-xl font-semibold">
          На варті Вашого здоров'я!
        </h2>
        <h3 className="text-md md:text-bg font-medium">
          We are guarding your health!
        </h3>
      </a>

      <a href="https://github.com/rupikon/medicine-warriors">
        <h1>Інформація про проект</h1>
      </a>
      <div className="flex">
        Powered by&nbsp;
        <a classname="inline" href="https://cloudlets.zone">
          Cloudlets.Zone
        </a>
      </div>
      {/* </div> */}
    </footer>
  )
}
