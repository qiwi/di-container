# di-container
Experiments around DI and IoC

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![buildStatus](https://img.shields.io/travis/qiwi/di-container.svg?maxAge=1000&branch=master)](https://travis-ci.org/qiwi/di-container)
[![Coveralls](https://img.shields.io/coveralls/qiwi/di-container.svg?maxAge=1000)](https://coveralls.io/github/qiwi/di-container)
[![dependencyStatus](https://img.shields.io/david/qiwi/di-container.svg?maxAge=1000)](https://david-dm.org/qiwi/di-container)
[![devDependencyStatus](https://img.shields.io/david/dev/qiwi/di-container.svg?maxAge=1000)](https://david-dm.org/qiwi/di-container)

##### Motivation
DI/IoC is nice and useful idea. There're several good JS implementations of this concept:  
1. [Inversify](https://github.com/inversify/InversifyJS)  
2. [Awilix](https://github.com/jeffijoe/awilix) and [Jeff's great article](https://medium.com/p/f2a88efdd427)  
...  
15. [di-decorators](https://github.com/lgvo/di-decorators) by Luis Gustavo Vilela de Oliveira  
16. [js-ioc-container](https://github.com/andene/js-ioc-container) by Andreas Kihlberg  

But nothing is perfect.  
So we need yet another one DI container absolutely incompatible with others.

##### DI must be simple

```javascript
    import {Container, CLASS} from 'di-container'

    class Bar {
      baz() {return 'qux'}
    }
    class Foo {
      constructor (bar) {
        this.bar = bar
      }
    }

    const container = new Container()
    
    container.register(Bar, {type: CLASS})
    container.register(Foo, {deps: [Bar], type: CLASS})

    const foo = container.get(Foo)
    const qux = foo.bar.baz(); 
```

##### Research area
1. Scopes
2. Proxies
3. Aliases
4. Lazy consistency check
5. Decorators