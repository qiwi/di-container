# di-container
Experiments around DI and IoC

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