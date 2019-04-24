# Sheetload

Load stylesheets dynamically. Also scripts.

## Quick Start

```bash
npm i @nowzoo/sheetload --save
```

Load a stylesheet...

```ts
import { Sheetload } from '@nowzoo/sheetload';
//...
Sheetload.load(url)
  .then((el: HTMLLinkElement) => {
    //links are disabled at this point...
    el.removeAttribute(el, 'disabled')
  })
  .catch((error: any) => {
    //...
  })
```

Load a script...

```ts
import { Scriptload } from '@nowzoo/sheetload';
//...
Scriptload.load(url)
  .then((el: HTMLScriptElement) => {
    //...
  })
  .catch((error: any) => {
    //...
  })
```


## API

### `Sheetload`

#### `static load(url: string): Promise<HTMLLinkElement>`
Loads a stylesheet, resolving with a newly created `link` element when it loads.

**Note:** The element's `disabled` attribute is set. You are responsible for enabling it:
```ts
this.renderer.removeAttribute(link, 'disabled');
```

**Note:** The element is appended to `document.head`. You are responsible for tracking the link tags yourself to prevent duplication.

### `Scriptload`

#### `static load(url: string): Promise<HTMLScriptElement>`
Loads a script, resolving with a newly created `script` element when the script loads.

**Note:** The element is appended to `document.head`. You are responsible for tracking the script elements yourself to prevent duplication.

### `Elementload`

#### `static load(el: HTMLElement): Promise<HTMLElement>`
Given an element, listens for `load` and `error` events. Resolves on load, rejects on error.


## Contributing

Contributions are welcome.

```bash
git clone https://github.com/nowzoo/sheetload.git
npm i
ng build sheetload --prod
```

The library code is located under [projects/sheetload](https://github.com/nowzoo/sheetload/tree/master/projects/sheetload).

Testing the library...

```bash
ng test sheetload
```

You can also use Wallaby for testing. Use the config found at `projects/sheetload/wallaby.js`.

Building the library...

```bash
ng build sheetload --prod
```

The demo code is in [src](https://github.com/nowzoo/ngx-highlight-js/tree/master/src). Run the demo locally...

```bash
# Build the current version of the library first...
ng build ngx-highlight-js --prod

ng serve --open
```





## License
[MIT](https://github.com/nowzoo/ngx-highlight-js/blob/master/LICENSE)
