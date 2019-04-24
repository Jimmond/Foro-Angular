
# ngx-highlight-js

Angular component and service for Highlight.js. Works with remote URLs or strings/variables. Loads highlight.js core, languages and themes as needed.

[Demo](https://nowzoo.github.io/ngx-highlight-js/)

## Quick Start
Install the library and the `@nowzoo/sheetload` dependency with NPM...


```bash
npm i @nowzoo/ngx-highlight-js @nowzoo/sheetload --save
```

Import into `AppModule` with `NgxHighlightJsModule.forRoot()`...</p>
```ts
import { NgxHighlightJsModule } from '@nowzoo/ngx-highlight-js';
// other imports...
@NgModule({
imports: [
  NgxHighlightJsModule.forRoot(),
  // other imports...
]
})
export class MyModule { }
```

Add an `NgxHighlightJsComponent`. You can provide an absolute or relative URL with the `url` input...

```ts
<ngx-highlight-js lang="scss"
  url="https://raw.githubusercontent.com/twbs/bootstrap/v4.1.1/scss/_variables.scss">
</ngx-highlight-js>
```
Or use the `code` input to use a string or a variable...

```ts
<!-- string... -->
<ngx-highlight-js lang="bash"
  code="npm i @nowzoo/ngx-highlight-js --save"></ngx-highlight-js>
<!-- variable... -->
<ngx-highlight-js lang="bash"
  [code]="myVar"></ngx-highlight-js>
```
## API

### Module: `NgxHighlightJsModule`  

`static forRoot()`

### Global Options

**Change the default theme:**

The `default` theme is loaded by default. To change this on an app-wide basis, provide an alternate value for `NGX_HIGHLIGHT_JS_DEFAULT_THEME`:

```ts
@NgModule({
  providers: [
    {provide: NGX_HIGHLIGHT_JS_DEFAULT_THEME, useValue: 'atelier-cave-dark'}
  ]
})
export class AppModule { }
```

**Change the CDN URL:**

By default, Highlight.js assets are downloaded from `//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0`. Change this with `NGX_HIGHLIGHT_JS_DEFAULT_THEME`:
```ts
@NgModule({
  providers: [
    {provide: NGX_HIGHLIGHT_JS_DEFAULT_THEME, useValue: '/path/to/highlight-js'}
  ]
})
export class AppModule { }
```


### Service: `NgxHighlightJsService`

**Methods**

`loaded(): Promise<any>`  
Ensures highlight.js is loaded, then resolves with the global `hljs` instance.

`loadLanguage(lang: string): Promise<void>`  
Resolves after ensuring the javascript to format the language has been loaded.

`loadTheme(theme: string): Promise<void>`  
Resolves after the stylesheet for the theme has loaded. Use the basename of the theme, like `'dracula'`. Only one theme can be loaded at a time.

`highlight(lang: string, code: string): Promise<string>`  
Highlights `code` with `lang`.


**Properties**

`theme: string`  
The currently loaded theme.

### Component: `NgxHighlightJsComponent`
selector: `ngx-highlight-js` | exportAs: `ngxHighlightJs`

**Inputs**

`code: string`  
A string containing the code you want to highlight.

`url: string`  
A URL with the code you want to highlight.

`lang: string`  
Required. The language.

**Properties**

`isInitializing: boolean`
True when highlighting (or re-highlighting) the code.

`error: string`
Set if highlighting fails.

## Contributing

Contributions are welcome.

```bash
git clone https://github.com/nowzoo/ngx-highlight-js.git
npm i
ng build ngx-highlight-js --prod
```

The library code is located under [projects/ngx-highlight-js](https://github.com/nowzoo/ngx-highlight-js/tree/master/projects/ngx-highlight-js).

Testing the library...

```bash
ng test ngx-highlight-js
```
You can also use Wallaby for testing. Use the config found at `projects/ngx-highlight-js/wallaby.js`.


Building the library...

```bash
ng build ngx-highlight-js --prod
```

The demo code is in [src](https://github.com/nowzoo/ngx-highlight-js/tree/master/src). Run the demo locally...

```bash
# Build the current version of the library first...
ng build ngx-highlight-js --prod

ng serve --open
```





## License
[MIT](https://github.com/nowzoo/ngx-highlight-js/blob/master/LICENSE)
