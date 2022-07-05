//funcções sao objetos em javascript.

//  Declarações versus expressões
//existem duas formas de declarar funcções em js,
//uma delas é dom o uso da palavra reservada FUNCTION a chamada declaração de função ex:

function add(num1, num2) {
  return num1 + num2;
}

//A segunda forma é a expressão de função, que não exige a palavra reservada function, essas funções sao consideradas anonimas porque o objeto função propriamente dito nao tem um nome.
//Em vez disso, as
//expressões de funções normalmente são referenciadas por meio de uma
//variável ou de uma propriedade, como nesta expressão:

var result = add(5, 5);

var add = function (num1, num2) {
  return num1 + num2;
}

//ao contrario do esperado, esse codigo não dará um erro
//a engine do JS ira fazer o 'hoisting' e irá buscar
//logo acima a operação que fora digitada na função


//porem esse hoisting só ira funcionar em declarações  de funções
//pois o nome da função já esta previamente sendo reconhecido 
//se tentarmos utilizar na expressao de função , 
//isso irá nos retornar um erro por exemplo:

var result = add(5, 5);

var add = function (num1, num2) {
  return num1 + num2
}

// OBS: Desde que as funções sejam sempre definidas antes de serem utilizadas,
//tanto as declarações quanto as expressões de função poderão ser usadas.

//FUNCÇÕES COMO VALORES
//como JS tem funções de primeira classe, voce pode usa-las assim como faria com qualquer outro objerto, voce pode atribui-las a variaveis, adiciona-las a objetos, passar as mesmas para functions como objetos eretorna-las a partir de outras funcções.

function saiHi() {
  console.log("Hi!");
}

saiHi();

var saiHi2 = saiHi;

saiHi2();

//nesse codigo tanto saiHi e saiHi2 aprontam para o mesmo lugar, nos possibilitando trabalhar as duas funções dinamicamente, vamos ao mesmo codigo agora escrito de modo a usar o construtor Function:

var sayHi = new Function(console.log('Hi'));
sayHi();

var sayHi2 = sayHi;

sayHi2()

//Por exemplo, você pode passar uma função para outra função como
//argumento : 

var numbers = [1, 5, 8, 4, 7, 10, 2, 6];
/*#1*/numbers.sort(function (first, second) {
  return first - second;
})

console.log(numbers);

var numeros = [1, 5, 8, 4, 7, 10, 2, 6];

/* #2 */ numeros.sort();
console.log(numeros);

//  PARÂMETROS
// Outro aspecto único das funções JavaScript é que você pode passar
//qualquer número de parâmetros para qualquer função sem causar erros.

function reflect(value) {
  return value;
}

console.log(reflect("Hi!"));
console.log(reflect("Hi!", 25));
console.log(reflect.length);

reflect = function () {
  return arguments[0]
};
console.log(reflect("Hi!")); // "Hi!"
console.log(reflect("Hi!", 25)); // "Hi!"
console.log(reflect.length); // 0

function sum() {
  var result = 0,
    i = 0;
  len = arguments.length;
  while (i < len) {
    result += arguments[i];
    i++;
  }

  return result;
}
console.log(sum(1, 2));
console.log(sum(3, 4, 5, 6));
console.log(sum(50));
console.log(sum());

//SOBRECARGA
//a maioria das linguagens orientadas a objetos suporta sobrecarga de funções, que seria a capacidade de uma função de ter varias assinaturas.
//porem nao axistem assinaturas em funções JS, ou seha não há sobrecarga

function sayMessage(message) {
  console.log(message);
}

function sayMessage() {
  console.log("Default message");
}

sayMessage("Hello");
//Em JavaScript, no entanto, quando várias funções são definidas com o mesmo nome, a função que aparecer por último em seu código será a vencedora

var sayMessage = new Function("message", "console.log(message);");
sayMessage = new Function("console.log(\"Default message\")");
sayMessage("Hello");

//O fato de as funções não terem assinatura em JavaScript não quer dizer que você não possa imitar o comportamento da sobrecarga de função. O número de parâmetros passados pode ser obtido por meio do objeto arguments, e essa informação pode ser usada para decidir o que deve ser feito. Por exemplo:

function sayMessage(message) {

  if (arguments.length === 0) {
    message = "Default message";
  }
  console.log(message);
}

sayMessage("Hello");

//METODOS DE OBJETOS
//como voce já sabe, é possivle adicionar e remover propriedades de um objeto a qualquer momento 
var person = {
  name: 'Nicolas',
  sayName: function () {
    console.log(person.name);
  }
}
person.sayName();

//Note que a sintaxe para o valor de uma propriedade de qualquer tipo e um método é a mesma: um identificador seguido de dois-pontos e o valor.

//OBJETO THIS

var person = {
  name: 'Waliston',
  sayName: function () {
    console.log(this.name);
  }
}
person.sayName();

//todo objeto em JS existe um valor THIS, ele ira referenciar o objeto, nos tirando o fardo de toda vez escrever o nome do objeto na hora de imprimir seja no console ou web.

/* Esse código funciona do mesmo modo que a versão anterior, mas, dessa
vez, sayName() referencia this em vez de person. Isso significa que você pode
facilmente alterar o nome da variável ou até mesmo reutilizar a função em
objetos diferentes. */




function sayNameForAll() {
  console.log(this.name);
}

var person1 = {
  name: 'Waliston',
  sayName: sayNameForAll
};

var person2 = {
  name: 'Azyr',
  sayName: sayNameForAll
}

var name = 'Michael';

person1.sayName();
person2.sayName();
sayNameForAll();


//MUDANDO  THIS
//A capacidade de usar e de manipular o valor de this das funções é fundamental para um bom entendimento de orientação a objetos em JavaScript, Há 3 metodos que permitem mudar o valor de THIS e eles sao:

//metodo CALL();
//O primeiro método para manipular this é call(), que executa a função com um determinado valor de this e com parâmetros especí cos. O primeiro parâmetro de call() é o valor que this deve ter quando a função for executada. Todos os parâmetros seguintes correspondem aos parâmetros que devem ser passados para a função.
function sayNameForAll(label) {
  console.log(label + ":" + this.name);
}

var person1 = {
  name: 'Azyr'
};

var person2 = {
  name: 'Greg'
};

var name = 'Michael';

sayNameForAll.call(this, "global");
sayNameForAll.call(person1, "person1")
sayNameForAll.call(person2, "person2")

//Como o método call() está sendo usado, não é preciso adicionar a função diretamente a cada objeto – você especifica explicitamente o valor de this em vez de deixar a engine do JavaScript fazer isso automaticamente.


//metodo APPLY()
//igual ao metodo call, tambem ira retornar variaveis sem precisar passar o this, a unica diferença que deveremos usar o APPLY somente quando tratamos arrays e nao cadeias de string normais como em call, exemplo: 

function sayNameForAll(label) {
  console.log(label + ":" + this.name);
}

var person1 = {
  name: 'Waliston'
}
var person2 = {
  name: 'Azyr'
}

var name = 'Michael';

sayNameForAll.apply(this, ["global"]);
sayNameForAll.apply(person1, ["person1"]);
sayNameForAll.apply(person2, ["person2"]);

// METODO BIND 
//O terceiro método para mudar o valor de this é bind(). Esse método foi adicionado no ECMAScript 5 e se comporta de modo bem diferente dos outros dois. O primeiro argumento de bind() corresponde ao valor de this para a nova função. Todos os demais argumentos representam parâmetros nomeados que devem ser definidos permanentemente na nova função. Você ainda pode passar qualquer parâmetro que não seja definido de modo permanente mais tarde.


function sayNameForAll(label) {
  console.log(label + ":" + this.name);
}
var person1 = {
  name: "Nicholas"
};
var person2 = {
  name: "Greg"
};
// cria uma função somente para person1
var sayNameForPerson1 = sayNameForAll.bind(person1);
sayNameForPerson1("person1"); // exibe 
var sayNameForPerson2 = sayNameForAll.bind(person2, "person2");
sayNameForPerson2(); // exibe "person2:Greg"

person2.sayName = sayNameForPerson1;
person2.sayName("person2"); // exibe "person2:Nicholas"