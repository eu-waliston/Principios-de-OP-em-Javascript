//CONSTRUTORES E PROTOTIPOS

//construtores
//um construtor é simplesmente uma função usapa com o operador NEW para criar objetos, porem os mesmos devem iniciar com letra maiuscula, para podermos diferencia-los entre as funções nomrmais, outra particularidade, é que as os objetos criados com o mesmo construtor têm as mesmas propriedades e os mesmos métodos. por exemplo:
function Person() {
  //intencionalmente vazia
}
//olhando para essa função, ela não tem nada de diferente das outras, a pista que nos é mostrada, é o Person iniciando com letra maiuscula.

//Após o construtor ter sido de nido, você pode começar a criar instâncias,
//como o que foi feito para os dois objetos Person a seguir:

var person1 = new Person();
var person2 = new Person();
//Obs: caso nao tenha nehum parametro, vc poderá optar por nao mostrar os parenteses.

console.log(person1 instanceof Person);
console.log(person2 instanceof Person);

//Como person1 e person2 foram criados com o construtor Person, instanceof
//retorna true quando verifica se esses objetos são instâncias do tipo Person.

console.log(person1.constructor === Person);
console.log(person2.constructor === Person);

//A função console.log retorna TRUE em ambos, pois eles foram criados a partir do construtor Person

/*
É claro que um construtor vazio não é muito útil. O propósito de um
construtor é fazer com que seja fácil criar mais objetos com as mesmas
propriedades e os mesmos métodos. Para fazer isso, simplesmente
adicione qualquer propriedade que você quiser a this no construtor, como
no exemplo a seguir:
*/

function Person(name, sobreName) {
  this.name = name;
  this.sobreName = sobreName;
  this.sayName = function () {
    console.log(this.name, this.sobreName);
  };
}

var person1 = new Person("Nicholas", "Tesla");
var person2 = new Person("Waliston", "Euripedes");
console.log(person1.name, person1.sobreName);
console.log(person2.name, person2.sobreName);

// person1.sayName();
// person2.sayName();

function Person(name) {
  Object.defineProperty(this, "name", {
    get: function () {
      return name;
    },
    set: function (newName) {
      name = newName;
    },
    enumerable: true,
    configurable: true,
  });
  this.sayName = function () {
    console.log(this.name);
  };
}

//Não se esqueça de sempre chamar os construtores com new; caso
//contrário, você correrá o risco de mudar o objeto global em vez de alterar
//o objeto recém-criado.

var person1 = Person("Nicholas"); //nota NEW esta ausente

console.log(person1 instanceof Person); //false
console.log(typeof person1); //undefined
console.log(name); //nicholas

//PROTIPOS
//voce pode pensar em um prototitpo como uma receita para um objeto.

var book = {
  title: "Príncípios de orientação a objetos em JavaScript",
};

console.log("title" in book);
console.log(book.hasOwnProperty("title"));
console.log("hasOwnProperty" in book);
console.log(book.hasOwnProperty("hasOwnProperty"));
console.log(Object.prototype.hasOwnProperty("hasOwnProperty"));

//A PROPRIEDADE [[PROTOTYPE]]
///Uma instância mantém o controle de seu protótipo por meio de uma
//propriedade interna chamada [[Prototype]]. Essa propriedade é um
//ponteiro para o objeto referente ao protótipo que a instância está usando.

//O valor da propriedade [[Prototype]] pode ser lido por meio do método
//Object.getPrototypeOf() de um objeto. Por exemplo, o código a seguir verifica
//o [[Prototype]] de um objeto genérico e vazio:

var object = {};
var prototype = Object.getPrototypeOf(object);
console.log(prototype === Object.prototype);

//Para qualquer objeto genérico como esse ❶, [[Prototype]] será sempre uma referência a Object.prototype.

//Tambem é possivel verificar se um objeto é prototipo de outro usando o metodo isPrototypeOF(), que está incluido em todos os objetos:
var object = {};
console.log(Object.prototype.isPrototypeOf(object)); //true

//Considere o código a seguir, em que um objeto é inicialmente criado sem nenhuma propriedade própria:

console.log(object.toString());
object.toString = function () {
  return "[object Custom]";
};

console.log(object.toString());
delete object.toString;

console.log(object.toString());
delete object.toString;

console.log(object.toString());

//Esse exemplo também enfatiza um conceito importante: não se pode
//atribuir um valor a uma propriedade do protótipo a partir de uma instância, deixando as propriedades do prototipo inalteradas

//USANDO PROTOTIPOS COMO CONSTRUTORES

// A natureza compartilhada dos protótipos faz com que eles sejam ideais
// para definir métodos somente uma vez para todos os objetos de um dado
// tipo.
// É muito mais e ciente colocar os métodos no protótipo e usar THIS para
// acessar a instância atual.

function Person(name) {
  this.name = name;
}

Person.prototype.sayName /*1*/ = function () {
  console.log(this.name);
};

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log(person1.name);
console.log(person2.name);

person1.sayName();
person2.sayName();

// Nessa versão do construtor Person, sayName() está de nido no protótipo ❶, e
// não no construtor.
// Como person1 e person2 são referências de
// base para as chamadas a sayName(), o valor this é atribuído a person1 e a
// person2, respectivamente.

// => Outros tipos de dados também podem ser armazenados no protótipo, mas tenha cuidado ao usar valores de referência.

// Como esses valores são
// compartilhados pelas instâncias, não espere que uma instância possa
// alterar os valores que outra instância irá acessar.

function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(this.name);
};

//1
Person.prototype.favorites = [];

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

person1.favorites.push("Pizza");
person2.favorites.push("quinoa");

console.log(person1.favorites);
console.log(person2.favorites);

// A propriedade favorites ❶ é definida no protótipo, o que significa que
// person1.favorites e person2.favorites apontam para o mesmo array. Qualquer
// valor adicionado à propriedade favorites de qualquer pessoa será um
// elemento do array que está no protótipo.
// Embora você possa adicionar propriedades ao protótipo, uma a uma,
// muitos desenvolvedores usam um padrão mais sucinto que envolve
// substituir o protótipo por um objeto literal:

function Person(name) {
  this.name = name;
}

Person.prototype = {
  sayName: function () {
    console.log(this.name);
  },
  toString: function () {
    return "[Person" + this.name + "]";
  },
};

// Esse código de ne dois métodos no protótipo: sayName() ❶ e toString() ❷ .
// Esse padrão se tornou bem popular porque elimina a necessidade de
// digitar Person.prototype diversas vezes. Porém há um efeito colateral do qual
// você deve estar ciente:

var person1 = new Person("Nicholas");
console.log(person1 instanceof Person); // true
console.log(person1.constructor === Person); // false
console.log(person1.constructor === Object); // true

// Usar a notação de objeto literal para sobrescrever o protótipo alterou apropriedade constructor, de modo que agora ela aponta para Object ❶ em
// vez de apontar para Person. Isso aconteceu porque a propriedade constructor
// está no protótipo, e não na instância do objeto. Quando uma função é
// criada, sua propriedade prototype é criada com uma propriedade
// constructor igual à função. Esse padrão sobrescreve completamente o
// objeto referente ao protótipo, o que significa que constructor será
// proveniente do novo objeto (genérico) criado, atribuído a Person.prototype.
// Para evitar isso, restaure a propriedade constructor para um valor
// adequado ao sobrescrever o protótipo:

function Person(name) {
  this.name = name;
}

Person.prototype = {
  constructor: Person, //1

  sayName: function () {
    return "[Person" + this.name + "]";
  },
};

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");
console.log(person1 instanceof Person); // true
console.log(person1.constructor === Person); // true
console.log(person1.constructor === Object); // false
console.log(person2 instanceof Person); // true
console.log(person2.constructor === Person); // true
console.log(person2.constructor === Object); // false

//ALTERANDO OS PROTOTIPOS
// Como todas as instâncias de um tipo particular referenciam um protótipo
// compartilhado, você pode estender todos esses objetos em conjunto a
// qualquer momento. Lembre-se de que a propriedade [[Prototype]] contém
// somente um ponteiro para o protótipo, e qualquer alteração no protótipo
// estará imediatamente disponível a qualquer instância que o referenciar.
// Isso signi ca que você pode literalmente adicionar novos membros a um
// protótipo a qualquer momento, e essas mudanças serão re etidas nas
// instâncias atuais, como neste exemplo:

function Person(name) {
  this.name = name;
}

Person.prototype = {
  constructor: Person,
  sayName: function () {
    return "[Person" + this.name + "]";
  },
};

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log("sayHi" in person1); // false
console.log("sayHi" in person2); // false

// adiciona um novo método
Person.prototype.sayHi = function () {
  console.log("Oi");
};
person1.sayHi(); // exibe "Hi"
person2.sayHi(); // exibe "Hi"

// A capacidade de modi car o protótipo a qualquer momento tem
// repercussões interessantes para objetos selados e congelados. Quando
// Object.seal() e Object.freeze() forem utilizados em um objeto, você estará
// agindo somente na instância do objeto e em suas propriedades próprias.
// Não é possível adicionar novas propriedades próprias nem mudar as que
// já existem em objetos congelados, mas, certamente, você poderá continuar
// adicionando propriedades ao protótipo e poderá estender esses objetos,
// como mostrado a seguir:

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

Object.freeze(person1);
Object.prototype.sayHi = function () {
  console.log("Hi");
};

person1.sayHi();
person2.sayHi();

// Nesse exemplo, há duas instâncias de Person. A primeira (person1) está
// congelada ❶ , enquanto a segunda é um objeto normal. Ao adicionar
// sayHi() ao protótipo ❷ , tanto person1 quanto person2 ganham um novo
// método, aparentemente, contradizendo o status de congelado de person1. A
// propriedade [[Prototype]] é considerada uma propriedade própria da
// instância e, embora a propriedade em si esteja congelada, o valor (um
// objeto) não está.

//PROTOTIPOS DE OBJETOS PRONTOS
// Nesse ponto, você deve estar se perguntando se os protótipos também
// permitem modi car os objetos prontos que são padrões na engine do
// JavaScript. A resposta é sim. Todos os objetos prontos têm construtores e,
// sendo assim, têm protótipos que podem ser alterados.

Array.prototype.sum = function () {
  return this.reduce(function (previous, current) {
    return previous + current;
  });
};

var numbers = [1, 2, 3, 4, 5, 6];
var result = numbers.sum();

console.log(result);

// Nesse exemplo, um método chamado sum(), que simplesmente soma todos
// os itens do array e retorna o resultado, é criado em Array.prototype. O array
// numbers tem acesso automaticamente a esse método por meio do protótipo.Em sum(), this se refere a numbers, que é uma instância de Array, de modo
// que o método é livre para usar outros métodos de array, por exemplo,
// reduce().
// Você deve estar lembrado de que strings, numbers e booleans têm tipos
// wrapper primitivos prontos, que são usados para acessar valores
// primitivos, como se fossem objetos. Se o protótipo de um tipo wrapper
// primitivo for modi cado, como no exemplo a seguir, você poderá
// adicionar mais funcionalidades a esses valores primitivos:

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.substring(1);
};
var message = "hello world!";
console.log(message.capitalize()); // "Hello world!"

