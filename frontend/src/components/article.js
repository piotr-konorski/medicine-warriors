import { content } from './website-content'
import parse from 'html-react-parser'


export default function Aricle() {
  return (
    <div className="p-6 md:py-14 flex items-center justify-center flex-col text-slate-900">

      {content.map(({ id, header, subheader, type, content, last }) => {
        return (
          <div key={id} id={id} className="max-w-3xl w-full">
            <h1 className="text-2xl md:text-4xl font-bold">
              {header && parse(header)}
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold my-0.5">
              {subheader && parse(subheader)}
            </h2>

            {/* text */}
            {!type && <p>{content && content.map((p) => parse(p))}</p>}

            {/* partner logos */}
            {type === 'inline' && (
              <div className="flex flex-item">
                {content && content.map((p) => parse(p))}
              </div>
            )}

            {/* horizonal bar */}
            {!last && <hr className="my-6 md:my-10" />}
          </div>
        )
      })}
    </div>
  )
}
