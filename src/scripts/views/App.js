import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import NotFound from './pages/not-found';

class App {
  constructor({body, appBar, button, drawer, hero, content, footer}) {
    this._body = body;
    this._appBar = appBar;
    this._button = button;
    this._drawer = drawer;
    this._hero = hero;
    this._content = content;
    this._footer = footer;

    this._initiateAppShell();
  }

  _initiateAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      hero: this._hero,
      content: this._content,
    });
  }

  _hideComponents(...components) {
    components.forEach((component) => component.classList.add('hidden'));
  }

  _seekComponents(...components) {
    components.forEach((component) => component.classList.remove('hidden'));
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    if (Object.keys(routes).includes(url)) {
      const page = new routes[url]();
      if (url === '/' || url === '/home') {
        this._seekComponents(this._appBar, this._hero);
        this._content.innerHTML = await page.render();
        await page.afterRender();
        this._seekComponents(this._footer);
      } else if (url === '/favorite' || url === '/detail/:id') {
        this._seekComponents(this._appBar);
        this._hideComponents(this._hero, this._footer);
        this._content.innerHTML = await page.render();
        await page.afterRender();
        this._seekComponents(this._footer);
      }
    } else {
      this._hideComponents(this._appBar, this._hero, this._footer);
      this._content.innerHTML = await NotFound.render();
    }
  }
};

export default App;
