//CAPÍTULO 1
//Tipos primitivos e de referência

//TIPOS PRIMITIVOS

//string
let name1 = 'Waliston';
let selection = 'a';

//number 
let count1 = 25;
let cost = 1.51;

//boolena
let found = true;

//null
let object = null;

//undefined
let flag1 = undefined;
let ref; //undefined é atribuido autimaticamente.

//========================

let color1 = "red";
let color2 = color1;

console.log(color1);
console.log(color2);

color1 = blue;

console.log(color1);
console.log(color2);

//Identificando tipos primitivos
//a melhor maneira de se fazer isso é com o typeof

console.log(typeof "Waliston"); //string
console.log(typeof 10); //number
console.log(typeof 5.1); //nnumber
console.log(typeof true); //boolean
console.log(typeof undefined); //undefined

//A melhor maneira de determinar se um valor é null é compará-lo
//diretamente com null, desta maneira:

console.log(value === null); //true or false

//COMPARANDO SEM CONVERSÃO
//Note que esse código usa o operador de igualdade triplo (===) em vez de usar o operador de
//igualdade duplo. Isso ocorre porque o operador triplo faz a comparação sem converter a
//letiável para outro tipo. Para entender o motivo pelo qual isso é importante, veja o código a
//seguir:

console.log("5" == 5); //true
console.log("5" === 5); //false

//Métodos primitivos
//mesmo sendo tipos primitivos, eles contem metodos
//que vão nos auxiliar a trabalhar com eles
//por exemplo:

let name = "Felipe";
let lowerCsasename = name.toLowerCase(); //converte para minusculos
let fistdLatter = name.charAt(0); //Obtem o primeiro caractere
let middleOfNome = name.subString(2, 5) //Obtem os caracteres de 2 a 4

let count = 10;
let fixedCount = count.toFixed(2) //Converte para "10.00"
let hexCount = count.toString(16) //Coverte para "A"

let flag = true;
let stringFlag = flag.toString() //Converte para "true"

//TIPOS DE REFERENCIA

let object1 = new Object();
let object2 = object1;
//aqui o objeto é criado com o uso do NEW 
//quando o object2 usa a referencia do 1
//nao é criado outro espaço na memoria
//ele ira referencia o obj1

//removendo a referncia do objeto
//o js tem um garbage collector
//ou seja nao é necessario realocar memoria
//porem podemos facilitar tudo isso removendo a referencia do objeto
let objeto3 = new Objet();
//faça algo
objeto3 = null //remove referencia
//remover a referencia e importe para grandes aplicações que utiliam diversos objetos


//adicionando ou removendo propriedades
let objeto1 = new Object();
let objeto2 = objeto1;

objeto1.myCustomProperty = "Aweasome!";
console.log(objeto2.myCustomProperty); //"Aweasome";

//INSTANCIANDO TIPOS PROPRIOS
//O js possui diversos tipos de referencia em sua APi
//que ira facilitar nosso trabalho como dev dentere eles temos:
// Array
// Date
// Error
// Function
// Object
// RegExp

//com ajuda do NEW voce pode instanciar cada tipo proprio

let items = new Array();
let now = new Date();
let error = new Error("Something bag happened")
let func = new Function(console.log('Hi'))
let obj = new Object()
let re = new RegExp("\\d+");


//FORMAS LITERAIS
//Vários tipos próprios apresentam formas literais. Uma forma literal é uma
//sintaxe que permite definir um valor de referência sem criar um objeto
//explicitamente, usando o operador new e o construtor do objeto

var book = {
  name: "Principios de irientação a Obj em Js",
  year: 2014
};

//voce tmb pode usar string o que é muito util se vc quer usar espaços ou caracteres especiais 

var book = {
  "name" : "Principios de irientação a Obj em Js",
  "year" : 2014 
}

// exemplo usando o construtor proprio:
var book = new Object();
book.name = "Principios de irientação a Obj em Js";
book.year = 2022;
console.log(book);

//NOTA Usar um literal de objeto, na verdade, não faz new Object() ser chamado. Em vez disso,
//a engine do JavaScript segue os mesmos passos usados em new Object() sem chamar o
//construtor. Isso vale para todos os literais de referência.


//LITERAIS DE FUNÇÃO
//não é muito aconselhavel utilizar o construtor 
//Funtion para criar uma função embora o mesmo já exista
//o que na vdd quase nunca é usado
//o melhor é partir para a forma literal

function reflect(value) {
  return value;
}
// é o mesmo que:
var reflect = new Function("value", "return  value;");

//LITERAIS DE EXPRESSOOÕES REGULARES
var numbers = /\d+/g;
//que é o mesmo que:
var numbers = new RegExp("\\d+", "g");

//ACESSO A PROPRIEDADES
//a forma mais simples e mais utilizada na maioria das lingiagens orientads o objetos (C#, Java etc)
//usam a notação do ponto
//mas tambem é posivel ascessar a mesma com o uso de colchetes com uma string

//notação ponto:
var array = [];
array.push(123456789);
console.log(array);

//notação de colchetes:
var array = [];
array["push"](1234)
console.log(array);

//IDENTIFICANDO TIPOS DE REFERENCIA
//uma função é o tipo de referencia mais facil de se descobrir pois quando usamos o TYPEOF
// o que deverá aparecer no console é o tipo "Function"

function reflect2(value) {
  return value;
}

console.log(typeof reflect2); //function

//porem não se aplica para os outros casos, os ooutros tipos, para isso podemos usar o >INSTANCEOF

//O operador instanceof recebe um objeto e um construtor como
//parâmetros. Quando o valor for uma instância do tipo especi cado pelo
//construtor, o operador instanceof retornará true. Caso contrário, ele
//retornará false

var item = [];
var objects = {};

function reflect3(value) {
  return reflect3
}

console.log(item instanceof Array); //true
console.log(objects instanceof Object); //true
console.log(reflect3 instanceof Function); //true

var items1 = [];
var objects1 = {};

function reflect4(value) {
  return value
}

console.log(items1 instanceof Array);
console.log(items1 instanceof Object);
console.log(objects1 instanceof Object);
console.log(objects1 instanceof Array);
console.log(reflect4 instanceof Function);
console.log(reflect4 instanceof Object);

//IDENTIFICANDO ARRAYS
//para podermos identificar arrays usaremos o metodo
///isArray()
//o mesmo ira retorn um true ou false

var items2 = [];
console.log(Array.isArray(items2)); //true

//TIPOS WRAPPER PRIMITOS
//Os tipos wrapper primitivos são tipos de referência criados
//automaticamente por baixo dos panos sempre que strings, numbers ou
//booleans são lidos

var nome = "Nicholas";
var firstChar = nome.charAt(0);
console.log(firstChar);

//isto é o que acontece internamente:
  //o que a engine do JS faz:
  var nome = "Waliston";
  var temp = new String(nome);
  var firstChar = temp.charAt(0);
  temp = null;
  console.log(firstChar) //W

//caso tentemos isso aqui:
// => var nome.last = "Zikas"
//porem o mesmo ira retornar um erro, pois os tipos wrraper primitivos as propriedades parcem desaparecer por que o objeto no qual a propriedade foi definida é destruido imediatamente no sequencia, o que o JS faz embaixo dos panos é isso aqui:

// var name = "Nicholas";
// var temp = new String(name);
// temp.last = "Zikas";
// temp = null //Objeto temporario é destruido

//var temp = new String(name);
// console.log(temp.last); //undefined
// temp = null;

