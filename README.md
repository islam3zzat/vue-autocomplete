# vue-autocompleter

> yet another autocomplete plugin

## Installing
```bash
# using yarn
yarn add vue-autocompleter
# using npm
npm install --save vue-autocompleter
```
``` javascript
# in main.js for example
// ...
import Autocomplete 'vue-autocompleter'
// ...
Vue.use(Autocomplete)
```
## Usage
``` html
<Autocomplete
  :placeholder=<placeholder>
  :path=<path>
  :api=<api>
  :param=<param>
  :method=<method>
  :closeOnSelect=<closeOnSelect>
  :resetOnSelect=<resetOnSelect>
  :optionsStyles=<optionsStyles>
  :optionStyles=<optionStyles>
  :inputStyles=<inputStyles>
  :optionsClass=<optionsClass>
  :optionClass=<optionClass>
  :inputClass=<inputClass>
  v-model=<msg>
  >
</Autocomplete>
```

## Documentation

| Prop          |  Type          |      Description      |  Default value |
|---------------|:--------------:|:---------------------|:---------------|
| placeholder   | String         | input Placeholder     | Placeholder    |
| path          | Function       | transformer function to map response to the desired option|null |
| api           | String         | api endpoint          | https://api.github.com/search/repositories (As demo) |
| param         | String         | param for search value| q (demo)|
| method        | String         | Api http method       | GET|     
| closeOnSelect | Boolean        | Close dropdown once select an element | true |
| resetOnSelect | Boolean        | Reset dropdown once select an element | true |
| inputStyles   | Object         | inline styles for input |{}|
| optionsStyles | Object         | inline styles for options |{}|
| optionStyles  | Object         | inline styles for option item |{}|
| inputClass    | String         | input class | null |
| optionsClass  | String         | input class | null |
| optionClass   | String         | input class | null |

## Customize option
You can customize how the option will be displayed by adding your template
```html
<!-- example -->
  <template  scope="{option, index}">
    <div class="option">
      <strong>{{index}}</strong>
      <span>{{option}}</span>
    </div>
  </template>

```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

