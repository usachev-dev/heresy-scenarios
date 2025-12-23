import ReactDOM, {createRoot, hydrateRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App  from './app'
import './styles/index.scss';

let el = document.getElementById('app')
if (!el) {
  throw new Error('could not render client: root id not found')
}
//@ts-ignore
if (!el.hasChildNodes() || ISDEV) {
  createRoot(el).render(<BrowserRouter><App /></BrowserRouter>)
} else {
  hydrateRoot(
    el,
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
  console.log('hydrated');

}

