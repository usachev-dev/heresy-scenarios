import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './app'
import './styles/index.scss';
import { LocalStorage } from "node-localstorage";

global.localStorage = new LocalStorage('./scratch');
export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
