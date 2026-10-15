/* Dev-only smoke test: renders every non-WebGL section through react-dom/server
   to catch runtime errors that TypeScript can't. Not part of the site bundle. */
import { renderToString } from 'react-dom/server'
import Nav from '../src/components/Nav'
import Stats from '../src/components/Stats'
import Marquee from '../src/components/Marquee'
import Services from '../src/components/Services'
import Work from '../src/components/Work'
import Process from '../src/components/Process'
import Contact from '../src/components/Contact'
import Footer from '../src/components/Footer'

const parts = { Nav, Stats, Marquee, Services, Work, Process, Contact, Footer }

let failed = false
for (const [name, Comp] of Object.entries(parts)) {
  try {
    const html = renderToString(<Comp />)
    console.log(`✓ ${name.padEnd(9)} ${html.length} chars`)
  } catch (err) {
    failed = true
    console.error(`✗ ${name}`, err)
  }
}

console.log(failed ? '\nSMOKE FAILED' : '\nSMOKE PASSED')
