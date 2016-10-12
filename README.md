# Libraries

## Utils

Before write any util method, first check if LoDash lib contains it.

> https://lodash.com/docs/

LoDash instance is `_` (underscore) property of `UtilsService`.

How to use it:

```
import { UtilsService } from '../shared/utils.service';

@Component({
    template: `
        <p *ngIf="utils._.last([1, 2, 3, 4, 5]) === 5">Directly from template</p>
    `
})
export class NewComponent{
  // Inject from DI
  constructor(private utils: UtilsService) {
  }

  someMethod(){
    console.log(
      this.utils._.last([1, 2, 3, 4, 5])
    );
  }
}
```

`UtilsService` should be extended for new util methods which aren't in `LoDash` lib.

If added method is general but not SP specific - be cool and fork `https://github.com/lodash/lodash/` & make pull request against with method. That way we are returning peace to community ;)

## Localization

The chosen is:

> https://www.npmjs.com/package/ng2-translate

# Coding

## Style guide

Coding standard extends Angular2 coding style guide defined here: https://angular.io/styleguide

Tslint rules to implement that standard are developed under `codelyzer` package: https://github.com/mgechev/codelyzer

Rules which defines coding standard are located in `tslint.json` file.

Rules definitions can be found at: https://palantir.github.io/tslint/rules/

### Install global dependencies

```
$ npm install -g tslint typescript
```

### Linter

By running:
```
$ gulp
```

live `on save` file linting will be applied and errors will be printed in command line.


# Web App Shell Build

`web_app shell` stands for integration environment for shared components in web page. It utilize `SystemJS` modules loader instead of full build & bundle process.
In this setup each typescript file is compiled into equivalent `JS ES5` with `CommonJS` syntax - _SystemJS loads files with commonJS syntax_.

More about SystemJS at:
> https://github.com/systemjs/systemjs

Build is powered by `gulp` task runner.
> http://gulpjs.com/

### Start build / live reload dev http server

```
$ gulp
```

## Flow

### Init tasks
1. task: `copyFonts` - copy all necessary fonts we need by components in `static/fonts` dir
2. task `sass` - compile `static/scss/app.md.scss` files to `static/css/app.md.css`
3. task `typescript` - starts `typescript compiler` in watching mode - compile each `*.ts` file on save
4. task `browserSync` - start development server https://localhost:3000/

### Independent tasks
1. task `tslint` - run `tslint` against `tslint.json` over all typescript files in project

#### _Note:_

>_All tasks can be executed independently by runnign `$ gulp taskName`_

### Watcher tasks
1. watcher `tslint` - run `tslint` against `tslint.json` over saved typescript file
2. watcher `sass` - compile `static/scss/app.md.scss` files to `static/css/app.md.css` and reload `css` in browser
3. watcher `index.html` - full page reload on save
