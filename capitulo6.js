//CAPITULO 6 - PADRÕES DE PROJETOS

/*

O JavaScript tem muitos padrões para criar objetos e, normalmente, há
mais de uma maneira de fazer o mesmo. Você pode de nir seus próprios
tipos personalizados ou seus próprios objetos genéricos sempre que
quiser. A herança pode ser usada para compartilhar comportamentos
entre objetos, ou outras técnicas podem ser empregadas, por exemplo, o
uso de mixins. Você também pode tirar proveito dos recursos avançados
do JavaScript para evitar que a estrutura de um objeto seja modi cada.
Os padrões discutidos neste capítulo representam maneiras e cientes de
criar e de manipular objetos

*/

//Membros privados e privilegiados

// Todas as propriedades de objetos em JavaScript são públicas, e não há
// nenhuma maneira explícita de indicar que uma propriedade não deva ser
// acessível de fora de um objeto em particular. Em algum momento, porém,
// você pode querer que os dados não sejam públicos. Por exemplo, quando
// um objeto utiliza um valor para determinar algum tipo de estado,
// modi car esse valor sem que o objeto tenha conhecimento transformaria
// o processo de gerenciamento desse estado em um caos. Uma maneira de
// evitar isso é usar convenções de nomenclatura.
//por exemplo, é muito comun pré fixar uma variavel com underline "_" indicando para os dev que aquela é uma variavél que não deve ser alterada

// Entretanto há maneiras
// de ocultar dados que não dependem de convenções e, desse modo, são
// mais “à prova de balas” para evitar a modi cação de informações
// privadas.

//Padrão de módulo

/*

O padrão de módulo é um padrão de criação de objetos concebido para criar
objetos únicos (singleton) com dados privados. A abordagem básica
consiste em usar uma IIFE (Immediately Invoked Function Expression, ou
expressão de função imediatamente invocada) que retorna um objeto.
Uma IIFE é uma expressão de função de nida e chamada imediatamente
para gerar um resultado. Essa expressão de função pode conter qualquer
número de variáveis locais que não sejam acessíveis de fora dessa função.
Como o objeto retornado é de nido dentro dessa função, os métodos do
objeto têm acesso aos dados. (Todos os objetos de nidos em uma IIFE
têm acesso às mesmas variáveis locais.) Os métodos que acessam dados
privados dessa maneira são chamados de métodos privilegiados. Aqui está o
formato básico do padrão de módulo:

*/

let yourObject = (function () {
    //variavel referente a dados privados
    return {
        //metodos e propriedades publicas
    }
}());

// Nesse padrão, uma função anônima é criada e executada imediatamente.
// (Note os parênteses extras no nal da função ❶ . Você pode executar
// funções anônimas imediatamente usando essa sintaxe.) Isso signi ca que
// a função só existe por um momento, é executada e, em seguida, é
// destruída. A IIFE é um padrão bem popular em JavaScript, em parte por
// causa de seu uso no padrão de módulo.

// O padrão de módulo permite usar variáveis normais como propriedades
// de objetos que não são expostas publicamente. Isso é feito por meio da
// criação de funções de closure como métodos do objeto. As closures são
// simplesmente funções que têm acesso a dados fora de seu escopo. Por
// exemplo, sempre que um objeto global é acessado em uma função, por
// exemplo, window em um web browser, essa função está acessando uma
// variável fora de seu próprio escopo. A diferença em relação às funções do
// padrão de módulo está no fato de que as variáveis são declaradas na IIFE,e uma função que também é declarada na IIFE acessa essas variáveis. Por
// exemplo:

var person = (function () {

    var age = 25;
    return {
        name: "Nicholas",

        getAge: function () {
            return age;
        },

        growOlder: function () {
            age++;
        }
    };
})();
console.log(person.name); // "Nicholas"
console.log(person.GetAge()); // 25

person.age = 100;

console.log(person.getAge()); // 25

person.growOlder();

console.log(person.getAge()); // 26

// Esse código cria o objeto person usando o padrão de módulo. A variável age
// ❶ atua como uma propriedade privada do objeto. Ela não pode ser
// acessada diretamente de fora do objeto, mas pode ser usada pelos
// métodos do objeto. Há dois métodos privilegiados no objeto: getAge() ❷ ,
// que lê o valor da variável age, e growOlder() ❸ , que incrementa age. Ambos
// os métodos podem acessar a variável age diretamente porque ela está
// de nida na função mais externa em relação ao local em que os métodos
// estão de nidos.

// Há uma variação do padrão de módulo chamada revealing module pattern
// (padrão de módulo revelador), que organiza todas as variáveis e os
// métodos no início da IIFE e simplesmente os atribui ao objeto retornado.

var person = (function () {
    var age = 25;

    function getAge() {
        return age;
    }
    function growOlder() {
        age++;
    }

    return {
        name: "Nicholas",
        getAge: getAge,
        growOlder: growOlder
    }
}());


console.log(person.name); // "Nicholas"

console.log(person.GetAge()); // 25

person.age = 100;

console.log(person.getAge()); // 25

person.growOlder();

console.log(person.getAge()); // 26

// Nesse código, o construtor Person tem uma variável local age. Essa variável
// é usada como parte dos métodos getAge() ❶ e growOlder() ❷ . Quando uma
// instância de Person é criada, essa instância recebe sua própria variável idade
// e seus próprios métodos getAge() e growOlder(). Em vários aspectos, isso é
// semelhante ao padrão de módulo, em que o construtor cria um escopo
// local e retorna o objeto this. Como discutido no capítulo 4, colocar
// métodos na instância de um objeto é menos e ciente que fazer isso no
// protótipo, mas essa é a única abordagem possível quando você quer ter
// dados privados e especí cos da instância.

//---------

// Se quiser que dados privados sejam compartilhados entre todas as
// instâncias (como se eles estivessem no protótipo), uma abordagem híbrida
// que se parece com o padrão de módulo, embora use um construtor,
// poderá ser usada:

var Person = (function () {
    //todos compartilham a mesma idade
    var age = 25;

    function InnerPerson(name) {
        this.name = name;
    }

    InnerPerson.prototype.getAge = function () {
        return age;
    };

    InnerPerson.prototype.growOlder = function () {
        age++;
    }

    return InnerPerson;
}());

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log(person1.name);
console.log(person1.getAge());

console.log(person2.name);
console.log(person2.getAge());

person1.growOlder();

console.log(person1.getAge());
console.log(person2.getAge());

// Nesse código, o construtor InnerPerson ❷ é de nido em uma IIFE. A
// variável age ❶ é de nida fora do construtor, mas é usada em dois métodos
// do protótipo. O construtor InnerPerson então é retornado e se torna o
// construtor Person no escopo global. Todas as instâncias de Person
// compartilham a variável age, portanto mudar o seu valor em uma
// // instância automaticamente afetará a outra instância.

// //Nesse código, o construtor InnerPerson ❷ é de nido em uma IIFE. A
// variável age ❶ é de nida fora do construtor, mas é usada em dois métodos
// do protótipo. O construtor InnerPerson então é retornado e se torna o
// construtor Person no escopo global. Todas as instâncias de Person
// compartilham a variável age, portanto mudar o seu valor em uma
// instância automaticamente afetará a outra instância.


//MIXINS

// Embora a herança pseudoclássica e a herança por protótipos sejam
// usadas frequentemente em JavaScript, há também um tipo de pseudo-
// herança implementada por meio de mixins. Os mixins ocorrem quando um
// objeto adquire as propriedades de outro sem modi car a cadeia de
// protótipos. O primeiro objeto (o receiver [receptor]) recebe as propriedades
// do segundo objeto (o supplier [fornecedor]) ao copiar diretamente essas
// propriedades.

function mixin(receiver, supplier) {
    for (var property in supplier) {
        if (supplier.hasOwnProperty(property)) {
            receiver[property] = supplier[property]
        }
    }
    return receiver;
}

// A função mixin() aceita dois argumentos: o receiver (receptor) e o supplier(fornecedor). O objetivo da função é copiar todas as propriedades
// enumeráveis do fornecedor para o receptor. Isso é feito por meio de um
// loop for-in que efetua a iteração pelas propriedades de supplier e atribui o
// valor de cada propriedade a uma propriedade de mesmo nome no
// receiver. Tenha em mente que essa é uma cópia rasa (shallow copy): se
// uma propriedade contiver um objeto, então tanto o receptor quanto o
// fornecedor apontarão para o mesmo objeto. Esse padrão é usado
// frequentemente em JavaScript para adicionar novos comportamentos já
// existentes em um objeto a outro.
// Por exemplo, um suporte a eventos pode ser adicionado a um objeto por
// meio de um mixin em vez de usar a herança.

function EventTarget() {
}
EventTarget.prototype = {

    constructor: EventTarget,
    addListener: function (type, listener) {
        // cria um array se ele não existir
        if (!this.hasOwnProperty("_listeners")) {
            this._listeners = [];
        }
        if (typeof this._listeners[type] == "undefined") {
            this._listeners[type] = [];
        }
        this._listeners[type].push(listener);
    },

    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }
        if (!event.type) { // falsy
            throw new Error("Event object missing 'type' property");
        }
        if (this._listeners && this._listeners[event.type] instanceof Array) {
            var listeners = this._listeners[event.type]; for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].call(this, event);
            }
        }
    },

    removeListener: function (type, listener) {
        if (this._listeners && this._listeners[type] instanceof Array) {
            var listeners = this._listeners[type];
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
};

// O tipo EventTarget oferece uma manipulação básica de eventos para
// qualquer objeto. Você pode adicionar ❶ ou remover ❸ listeners assim
// como disparar eventos ❷ diretamente no objeto. Os listeners de evento
// são armazenados na propriedade _listeners, criada somente quando
// addListener() é chamada pela primeira vez (isso facilita efetuar a
// combinação do mixin).

//Instâncias de EventTarget podem ser usadas desta
//maneira:

var target = EventTarget();
target.addListener("message", function () {
    console.log("Message is " + event.data);
})

target.fire({
    type: "message",
    data: "Hello World!"
});

// O suporte a eventos é útil para os objetos em JavaScript. Se você quiser ter
// um tipo diferente de objeto que também suporte eventos, há algumas
// opções. Em primeiro lugar, podemos criar uma nova instância de
// EventTarget e adicionar as propriedades desejadas:

person.name = "Nicholas";
person.sayName = function () {
    console.log(this.name);
    this.fire({ type: "namesaid", name: this.name });
}

// Nesse código, uma nova variável chamada person é criada como uma
// instância de EventTarget e, em seguida, as propriedades relacionadas à
// person são adicionadas. Infelizmente, isso signi ca que person é uma
// instância de EventTarget e não de Object ou de um tipo personalizado. Há
// também o overhead de ter de adicionar várias propriedades novas
// manualmente. Seria melhor se houvesse uma maneira mais organizada de
// fazer isso.

// A segunda maneira de resolver esse problema é usar a herança
// pseudoclássica:
function Person(name) {
    this.name = name;
}
Person.prototype = Object.create(EventTarget.prototype);
Person.prototype.constructor = Person;
Person.prototype.sayName = function () {
    console.log(this.name);
    this.fire({ type: "namesaid", name: this.name });
};
var person = new Person("Nicholas");
console.log(person instanceof Person); // true
console.log(person instanceof EventTarget); // true

// Nesse caso, há um novo tipo Person que herda de EventTarget ❶ . Você pode
// adicionar quaisquer outros métodos necessários ao protótipo de Person
// depois disso. Entretanto isso não é tão sucinto quanto poderia ser, e você
// poderia argumentar que o relacionamento não faz sentido: uma pessoa é
// um tipo de event target? Ao usar um mixin no lugar dessa solução, é
// possível reduzir a quantidade de código necessária para atribuir essas
// novas propriedades ao protótipo:

function Person(name) {
    this.name = name;
}
mixin(Person.prototype, EventTarget.prototype);
mixin(Person.prototype, {
    constructor: Person,
    sayName: function () {
        console.log(this.name);
        this.fire({ type: "namesaid", name: this.name });
    }
});
var person = new Person("Nicholas");
console.log(person instanceof Person); // true
console.log(person instanceof EventTarget); // false

// É claro que você pode decidir que, ao mesmo tempo que você quer usar as
// propriedades de um objeto, você não quer ter um construtor com herança
// pseudoclássica. Nesse caso, um mixin pode ser usado diretamente ao
// criar o seu novo objeto:

var person = mixin(new EventTarget(), {
    name: "Nicholas",
    sayName: function () {
        console.log(this.name);
        this.fire({ type: "namesaid", name: this.name });
    }
});

// Nesse exemplo, uma nova instância de EventTarget é combinada com
// algumas propriedades novas para criar o objeto person sem afetar a cadeia
// de protótipos de person.
// Um aspecto a se ter em mente sobre o uso de mixins dessa maneira é que
// as propriedades de acesso do fornecedor se tornam propriedades de dados
// no receptor, o que signi ca que se você não for cuidadoso, poderásobrescrevê-las.

// . Isso acontece porque as propriedades do receptor estão
// sendo criadas por atribuição e não pelo método Object.defineProperty(), o
// que signi ca que o valor da propriedade atual no fornecedor é lido e, em
// seguida, atribuído a uma propriedade de mesmo nome no receptor. Por
// exemplo:

var person = mixin(new EventTarget(), {

    get name() {
        return "Nicholas"
    },
    sayName: function () {
        console.log(this.name);
        this.fire({ type: "namesaid", name: name });
    }
});
console.log(person.name); // "Nicholas"
person.name = "Greg";
console.log(person.name); // "Greg"

// Nesse código, name é de nido como uma propriedade de acesso somente
// com um getter ❶ . Isso signi ca que atribuir um valor à propriedade não
// deve ter nenhum efeito. Entretanto, como a propriedade de acesso se torna
// uma propriedade de dados no objeto person, é possível sobrescrever name
// com um novo valor. ❷ Durante a chamada a mixin(), o valor de name é lido
// do fornecedor e atribuído à propriedade chamada name no receptor. Em
// nenhum momento, durante esse processo, uma propriedade nova de
// acesso foi de nida, fazendo com que a propriedade name no receptor seja
// uma propriedade de dado.

// Se você quiser que propriedades de acesso sejam copiadas como
// propriedades de acesso, será necessário ter uma função mixin() diferente,
// como esta:

function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function (propoerty) {
        var descriptor = Object.getOwnPropertyDescriptor(supplier, propoerty);

        Object.defineProperty(receiver, propoerty, descriptor)
    });

    return receiver;
}

var person = mixin(new EventTarget(), {
    get name() {
        return "nicholas"
    },
    sayName: function () {
        console.log(this.name);
        this.fire({ type: "namesaid", name: name })
    }
});

console.log(person.name);

person.name = "greg";

console.log(person.name);

// Nesse código, name é de nido como uma propriedade de acesso somente
// com um getter ❶ . Isso signi ca que atribuir um valor à propriedade não
// deve ter nenhum efeito. Entretanto, como a propriedade de acesso se torna
// uma propriedade de dados no objeto person, é possível sobrescrever name
// com um novo valor. ❷ Durante a chamada a mixin(), o valor de name é lido
// do fornecedor e atribuído à propriedade chamada name no receptor. Em
// nenhum momento, durante esse processo, uma propriedade nova de
// acesso foi de nida, fazendo com que a propriedade name no receptor seja
// uma propriedade de dado.
// Se você quiser que propriedades de acesso sejam copiadas como
// propriedades de acesso, será necessário ter uma função mixin() diferente,
// como esta:

function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function (property) {
        var descriptor = Object.getOwnPropertyDescriptor(supplier,
            property);
        Object.defineProperty(receiver, property, descriptor);
    });

    return receiver;
}
var person = mixin(new EventTarget(), {
    get name() {
        return "Nicholas"
    },
    sayName: function () {
        console.log(this.name);
        this.fire({ type: "namesaid", name: name });
    }
});
console.log(person.name); // "Nicholas"
person.name = "Greg";
console.log(person.name); // "Nicholas"

// Essa versão de mixin() usa Object.keys() ❶ para obter um array com todas as
// propriedades próprias enumeráveis de supplier. O método forEach() é
// usado para efetuar uma iteração por essas propriedades. O descritor de
// cada propriedade em supplier é obtido e, em seguida, é adicionado ao
// receiver por meio de Object.defineProperty() ❷ . Essa operação garante que
// todas as informações relevantes da propriedade sejam transferidas para o
// receiver, e não apenas o valor. Isso quer dizer que o objeto person tem uma
// propriedade de acesso chamada name, portanto ela não poderá ser
// sobrescrita.

//persores mais antigas do js (abaixo de ES5)  utilize: 

function mixin(receiver, supplier) {

    if (Object.getOwnPropertyDescriptor) {
        Object.keys(supplier).forEach(function (property) {
            var descriptor = Object.getOwnPropertyDescriptor(supplier,
                property);
            Object.defineProperty(receiver, property, descriptor);
        });
    } else {
        for (var property in supplier) {
            if (supplier.hasOwnProperty(property)) {
                receiver[property] = supplier[property]
            }
        }
    }
    return receiver;
}

// Nesse caso, mixin() veri ca se Object.getOwnPropertyDescriptor() ❶ existe para
// determinar se a engine do JavaScript suporta ECMAScript 5. Em caso
// a rmativo, a versão para ECMAScript 5 é utilizada. Do contrário, a versão
// para ECMAScript 3 é usada ❷. Essa função é segura tanto para as engines
// modernas quanto para as mais antigas, pois a estratégia de mixin mais
// apropriada será aplicada.

//CONSTRUTORES DE ESCOPO SEGURO

// Como todos os construtores são apenas funções, eles podem ser
// chamados sem o uso do operador new e, sendo assim, podem afetar o valor
// de this. Fazer isso pode levar a resultados inesperados, pois this acaba
// referenciando o objeto global em modo não restrito ou o construtor
// lançará um erro em modo restrito.

//no cap 4 vimos: 

function Person(name) {
    this.name = name;
}
Person.prototype.sayName = function () {
    console.log(this.name);
};
var person1 = Person("Nicholas"); // nota: falta "new"
console.log(person1 instanceof Person); // false
console.log(typeof person1); // "undefined"
console.log(name); // "Nicholas"

// Person é chamado sem o operador new
// Tenha em mente que esse código
// está sendo executado em modo não restrito, pois deixar de usar new fará
// um erro ser lançado em modo restrito. O fato de o nome do construtor
// começar com uma letra maiúscula normalmente indica que ele deve ser
// precedido por um new, mas e se você quiser permitir esse tipo de uso e
// fazer a função operar sem new? Muitos construtores prontos, como Array e
// RegExp, também funcionam sem new porque eles foram escritos para terem
// escopo seguro. Um construtor de escopo seguro pode ser chamado com ou
// sem o operador new e retorna o mesmo tipo de objeto em qualquer caso.

// Quando new é chamado com uma função, o objeto recém-criado
// representado por this já é uma instância do tipo personalizado
// representado pelo construtor. Portanto instanceof pode ser utilizado para
// determinar se new foi usado na chamada da função:

function Person(name) {
    if(this instanceof Person) {
        //chamado com "new"
    } else {
        //chamado sem "new"
    }
}

// Usar um padrão como esse permite controlar o que uma função faz de
// acordo com o fato de ela ter sido chamada ou não com new. Pode ser que
// você queira tratar cada circunstância de modo diferente, mas,
// normalmente, irá querer que a função se comporte da mesma maneira
// (frequentemente, para se proteger contra omissões acidentais de new).

//uma versão de escopo seguro de Person, tem esse aspecto:

function Person(name) {
    if(this instanceof Person ) {
        this.name = name;
    } else {
        return new Person();
    }
}

// Para esse construtor, a propriedade name é atribuída como sempre, quando
// new é usado. Se new não for usado, o construtor será chamadorecursivamente por meio de new para criar uma instância apropriada do
// objeto. Dessa maneira, ambas as opções a seguir são equivalentes:
// var person1 = new Person("Nicholas");
// var person2 = Person("Nicholas");
// console.log(person1 instanceof Person); // true
// console.log(person2 instanceof Person); // true
// Criar novos objetos sem usar o operador new está se tornando mais
// comum, como um esforço para coibir erros causados pela omissão de new.
// O próprio JavaScript tem diversos tipos de referência com construtores de
// escopo seguro, como Object, Array, RegExp e Error.

/*

Sumário
Há diversas maneiras de criar e compor objetos em JavaScript. Embora o
JavaScript não tenha um conceito formal de propriedades privadas, você
pode criar dados ou funções que sejam acessíveis somente de dentro de
um objeto. Para objetos únicos (singleton), o padrão de módulo pode ser
usado para ocultar os dados do mundo externo. Uma IIFE (função de
expressão imediatamente invocada) pode ser usada para de nir variáveis
locais e funções que sejam acessíveis somente pelo objeto recém-criado.
Métodos privilegiados são métodos de um objeto que têm acesso a dados
privados. Você também pode criar construtores que tenham dados
privados, seja de nindo variáveis na função construtora, seja usando uma
IIFE para criar dados privados que serão compartilhados por todas as
instâncias.
Os mixins são uma maneira e ciente de adicionar funcionalidade a
objetos ao mesmo tempo que se evita a herança. Um mixin copia
propriedades de um objeto para outro, de modo que o objeto receptor
obtenha as funcionalidades do fornecedor sem que haja herança. De
modo diferente da herança, os mixins não permitem identi car a
procedência das funcionalidades depois que o objeto for criado. Por essa
razão, os mixins são mais bem empregados com propriedades de dados
ou com pequenas funcionalidades. A herança continua sendo preferível
quando queremos obter mais funcionalidades e conhecemos a suaprocedência.
Os construtores de escopo seguro são construtores que podem ser
chamados com ou sem o operador new para criar uma nova instância de
um objeto. Esse padrão tira vantagem do fato de que this é uma instância
do tipo personalizado assim que o construtor começa a ser executado, o
que permite alterar o comportamento do construtor de acordo com o fato
de o operador new ter sido ou não utilizado.

*/
