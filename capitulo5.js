//Capitulo 5 Herança
//Aprender a criar objeto é o primeiro passo para entender programação orietada a objetos, o segundo paso é enteder sobre herança. 


//CADEIA DE PROTOTIPOS E OBJECT.PROTOTYPE

// A abordagem que o JavaScript tem para lidar com a herança chama-se
// cadeia de protótipos ou herança prototípica. Como vimos no capítulo 4, as
// propriedades dos protótipos estão automaticamente disponíveis nas
// instâncias dos objetos, o que é uma forma de herança. As instâncias dos
// objetos herdam as propriedades do protótipo. Como o protótipo também
// é um objeto, ele tem seu próprio protótipo e herda suas propriedades.
// Essa é a cadeia de protótipos: um objeto herda de seu protótipo, enquanto esse
// protótipo, por sua vez, herda de seu protótipo, e assim por diante.

var book = {
    title: "Principios de orientação a objetos em JS"
};

var prototype = Object.getPrototypeOf(book);

console.log(prototype === Object.prototype);

//Métodos herdados de Object.prototype

// Muitos métodos usados em capítulos anteriores deste livro estão, na
// verdade, de nidos em Object.prototype e, portanto, são herdados por todos
// os demais objetos. Esses métodos são:

// hasOwnProperty() - Determina se uma propriedade própria com o nome especificado existe.

// propertyIsEnumerable() - Determina se uma propriedade própria é enumerável

// isPropertyOf() - Determina se o objeto é protótipo de outro.

// toString() - Retorna uma representação do objeto em forma de string.

// VALUEOF() 
//O método valueOf() é chamado sempre que um operador é usado em um objeto.

//Por padrão, valueOf() simplesmente retorna a instância do objeto.

// Os tipos wrapper primitivos sobrescrevem valueOf() de modo que uma
// string é retornada para String, um booleano é retornado para Boolean e um

// número é retornado para Number. Da mesma maneira, o método valueOf()

// do objeto Date retorna o instante no tempo em milissegundos (assim como

// é feito por Date.prototype.getTime()). É isso que permite que você escreva umcódigo que compare datas desta maneira:

let now = new Date();
let earlier = new Date(2021, 05, 30);
console.log(now > earlier);

//TO STRING()
//O método toString() é chamado como fallback sempre que valueOf()

//retorna um valor de referência no lugar de um valor primitivo.

var book = {
    title: "Principios de orientação a objetos em JS",

    toString: function () { //1
        return "[Book " + this.title + "]"
    }
};

var message = "Book = " + book;
console.log(message);

// Esse código de ne um método toString() personalizado para book, que
// retorna um valor mais útil ❶ que a versão herdada. Normalmente, não é
// preciso se preocupar com a de nição de um método toString()
// personalizado, mas é bom saber que isso é possível se for necessário.

//Modificando Object.prototype

// Todos os objetos herdam de Object.prototype por padrão, portanto
// mudanças em Object.prototype afetam todos os objetos. Essa é uma
// situação muito perigosa. No capítulo 4, você foi aconselhado a não
// modi car os protótipos de objetos prontos, e esse conselho é reforçado
// para Object.prototype. Observe o que pode acontecer:

Object.prototype.add = function (value) {
    return this + value;
};

var book = {
    title: "Principios de Orientação a objetos em JS"
};

console.log(book.add(5));
console.log("title".add("end"));

// em um web browser
// console.log(document.add(true)); 
// console.log(window.add(5));

// Adicionar Object.prototype.add() faz com que todos os objetos tenham um
// método add(), não importa se isso faça sentido ou não. Essa questão tem
// sido um problema não só para os desenvolvedores, mas também para o
// comitê que trabalha na linguagem JavaScript: foi necessário inserir novos
// métodos em locais diferentes porque adicionar métodos em
// Object.prototype pode provocar consequências inesperadas.

var empty = {}
for (var property in empty) {
    console.log(property);
}

// Nesse caso, um objeto vazio irá exibir "add" como propriedade porque ela
// existe no protótipo e é enumerável. Considerando a frequência com que a
// estrutura for-in é usada em JavaScript, modi car Object.prototype com
// propriedades enumeráveis tem o potencial de afetar muito código. Por
// essa razão, Douglas Crockford recomenda sempre usar hasOwnProperty() em
// loops for-in1, como em:

var empty = {};

for (var property in empty) {
    if (empty.hasOwnPRoperty(property)) {
        console.log(property);
    }
}

// Se, por um lado, essa abordagem é eficiente contra possíveis propriedades
// indesejadas dos protótipos, por outro, ela também limita o uso do loop
// for-in apenas às propriedades próprias, que pode ou não ser o que você
// quer. Sua melhor aposta para ter o máximo de exibilidade é não
// modi car Object.prototype.


//HERANÇA ENTRE OBJETOS

// O tipo mais simples de herança é a herança entre objetos. Tudo o que
// você deve fazer é especi car que objeto deve ser o [[Prototype]] do novo
// objeto. Objetos literais têm seu [[Prototype]] de nido como Object.prototype
// implicitamente, mas [[Prototype]] também pode ser explicitamente
// especi cado no método Object.create().
var book = {
    title: "Princípios de orientação a objetos em JavaScript"
};

// é o mesmo que:
var book = Object.create(Object.prototype, {
    title: {
        configurable: true,
        enumerable: true,
        value: "Princípios de orientação a objetos em JavaScript",
        writable: true
    }
});

// O objeto book
// resultante de cada declaração se comporta exatamente da mesma
// maneira. Mas é provável que você jamais vá escrever código que herde de
// Object.prototype diretamente, pois isso já é padrão. Herdar de outros
// objetos é muito mais interessante:

var person1 = {
    name: "Nicholas",
    sayName: function () {
        console.log(this.name);
    }
};

var person2 = Object.create(person1, {
    name: {
        configurable: true,
        enumerable: true,
        value: "Greg",
        writable: true
    }
})

person1.sayName();
person2.sayName();


console.log(person1.hasOwnProperty("sayName")); // 
console.log(person1.isPrototypeOf(person2)); // 
console.log(person2.hasOwnProperty("sayName")); //

// Apesar disso, a possibilidade de criar objetos sem
// protótipos é um aspecto interessante da linguagem JavaScript.

//HERANÇA DE CONSTRUTORES
//A herança de objetos em JavaScript também é a base da herança de construtores.


// Você escreve isto:
function YourConstrutor() {
    // inicialização
}
// A engine do JavaScript faz isto internamente

YourConstrutor.prototype = Object.create(Object.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: YourConstrutor,
        writable: true
    }
});

// Sem fazer nada adicional, esse código de ne a propriedade prototype do
// construtor com um objeto que herda de Object.prototype, o que signi ca
// que qualquer instância de YourConstrutor também herdará de
// Object.prototype. YourConstrutor é um subtipo de Object, e Object é um supertipo de
// YourConstrutor.

// Como a propriedade prototype pode ser atualizada, a cadeia de protótipospode ser alterada ao ser sobrescrita. Considere o exemplo a seguir:

function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}

Rectangle.prototype.getArea = function () {
    return this.length * this.width;
}

Rectangle.prototype.toString = function () {
    return "[Rectangle " + this.length + "x" + this.width + "]";
}

//herda de Rectangle
function Square(size) {
    this.length = this.length;
    this.width = size;
}

Square.prototype = new Rectangle();
Square.prototype.constructor = Square;
Square.prototype.toString = function () {
    return "[Square " + this.length + "x" + this.width + "]";
};

var rect = new Rectangle(5, 10);
var square = new Square(6);

console.log(rect.getArea()); // 50
console.log(square.getArea()); // 36
console.log(rect.toString()); // "[Rectangle 5x10]"
console.log(square.toString()); // "[Square 6x6]"
console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Object); // true
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true
console.log(square instanceof Object); // true


//FURTO DE CONSTRUCTOR
// Como a herança é implementada por meio de cadeias de protótipos emJavaScript, não é preciso chamar o construtor do supertipo de um objeto.
// Se quiser chamar o construtor do supertipo a partir do construtor do
// subtipo, você deverá tirar vantagem do modo como as funções em
// JavaScript funcionam.

// No capítulo 2, você conheceu os métodos call() e apply(), que permitem
// que as funções sejam chamadas com um valor this diferente. É
// exatamente dessa maneira que o furto de construtor (constructor stealing)
// funciona. Basta chamar o construtor do supertipo a partir do construtor
// do subtipo usando call() ou apply() para passar o objeto recém-criado. De
// fato, você estará roubando o construtor do supertipo para o seu próprio
// objeto, como neste exemplo:

function Rectangle(lenght, width) {
    this.length = lenght;
    this.width = width;
}

Rectangle.prototype.getArea = function () {
    return this.length * this.width;
};

Rectangle.prototype.toString = function () {
    return "[Rectangle " + this.length + "x" + this.width + "]";
}

//herda de retangle
function Square(size) {
    Rectangle.call(this, size, size);
    // opcional: adiciona novas propriedades ou sobrescreve as
    // propriedades existentes aqui

}
Square.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: Square,
        writable: true
    }
})

Square.prototype.toString = function () {
    return "[Square" + this.length + "x" + this.width + "]";
};

var square = new Square(6);

console.log(square.length);
console.log(square.width);
console.log(square.getArea());

//ACESSANDO OS MÉTODOS DO SUPERTIPO

// No exemplo anterior, o tipo Square tem seu próprio método toString() que
// encobre o método toString() do protótipo. É bastante comum sobrescrever
// os métodos do supertipo com novas funcionalidades no subtipo; mas e se
// você quiser continuar acessando o método do supertipo? Em outras
// linguagens, provavelmente você poderá usar super.toString(), porém o
// JavaScript não tem nada semelhante. Em vez disso, é possível acessar
// diretamente o método do protótipo referente ao supertipo e usar tanto
// call() quanto apply() para executar o método no objeto referente ao
// subtipo. Por exemplo:

function Rectangle(length, width) {
    this.length = length; this.width = width;
}
Rectangle.prototype.getArea = function () {
    return this.length * this.width;
};
Rectangle.prototype.toString = function () {
    return "[Rectangle " + this.length + "x" + this.width + "]";
};
// herda de Rectangle
function Square(size) {
    Rectangle.call(this, size, size);
}
Square.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: Square,
        writable: true
    }
});
// chama o método do supertipo
Square.prototype.toString = function () {
    var text = Rectangle.prototype.toString.call(this);
    return text.replace("Rectangle", "Square");
};

// Nessa
// versão,
// ❶
// chama
// Rectangle.prototype.toString() usando call(). O método só precisa substituir
// "Rectangle" por "Square" antes de retornar o texto resultante. Essa
// abordagem pode parecer um pouco extensa para uma operação simples
// como essa, mas é a única maneira de acessar um método do supertipo.