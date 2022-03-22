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
      <br/>

      <a href="https://github.com/rupikon/medicine-warriors">
        <h1>Репозиторій коду</h1>
      </a>
      <br/>

      <div className="flex" >
      <small>
        Powered by&nbsp;
        <a className="inline small" href="https://cloudlets.zone">
          Cloudlets.Zone
        </a>
      </small>
      </div>
      {/* </div> */}
    </footer>
  )
}
