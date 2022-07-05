//CAPITULO 3
//ENTENDENDO OBJETOS
//saiba que objetos em javascript sao coisas dinamica, entao vc pode mudar suas caracteristicas ao decorrer do tempo diferente de outras linguagens que os objetos são definidos por uma classe e o que pode conter dentro do mesmo é apenas o que já fora criado de antemão, mas tenha sempre em mente que a programação em javascript é representada pela manipulação desses objetos, então para programar bem em JS, é preciso dominar os objetos.

//DEFININDO PROPRIEDADES
//como já sabes, existem duas formar de se criar um objeto, a primeira é com o uso do construtor OBJETCT e a outra de uma maneira literal, como por exemplo:

var person1 = {
  name: 'Nicholas'
}

var person2 = new Object();
person2.name = "Nicholas";

person1.age = "Redacted";
person2.age = "Redacted";

person1.name = "Gred";
person2.name = "Michael";

//Quando uma propriedade é adiciona pela primeira vez, internamentre o JS chama o metodo [[Putt]], esse metodo cria um espaço no objeto para amrmazenar essa propriedade =>  isso pode ser comparado a adição de uma chave em uma tabela hashh pela primeira vez., o resultado da chamada a [[putt]] é a criação de uma PROPRIEDADE PROPRIA no objeto. => Uma propriedade própria simplesmente indica que a instância específica do objeto tem aquela propriedade. => A propriedade é armazenada diretamente na instância e todas as operações sobre a propriedade devem ser executadas por meio desse objeto.

//agora quando um valor é atribuido, a operação chamada será a [[sett]], essa operação subtitui o valor atual pelo que setamos depois


//VERIFICANDO A EXISTENCIA DE PROPRIEDADES
//como as propriedades podem ser adicionadas a qualquer momento, as vezes é nessesario uma maneira para saber se as mesmas existem certo ? e existe porem muitos desenvolvedores iniciantes utilizam a maneira errada de se fazer o mesmo como no exemplo a seguir: 

//nao confiavel 
if(person1.age) {
  //faz algo com a idade (age)
}
//O problema com esse padrão está no modo como as conversões de tipo
//do JavaScript afetam o resultado
//Como uma propriedade de objeto pode conter
//qualquer um desses valores falsy, o exemplo anterior pode resultar em um
//falso negativo.
//Uma maneira mais con ável
//de testar a existência de uma propriedade é por meio do operador IN.

//O operador in procura uma propriedade com um determinado nome em
//um objeto especí co e retorna true se ela for encontrada. Com efeito, o
//operador in veri ca se a chave especi cada existe na tabela hash

//por exemplo aqui, o IN será usado para pesquisar ser algumas prpŕiedades exitem denstro do objeto person1:

console.log("name" in person1);
console.log("age" in person1);
console.log("title" in person1);

let search = "title" in person1;

if (search == true) {
  console.log(person1.name);
} else {
  console.log("Proriedade não encontrada!!!");
}

//Tenha em mente que os métodos são apenas propriedades que
//referenciam funções, portanto você pode verificar a existência de um
//método da mesma forma.

var person1 = {
  name: "Nicholas",
  
  sayName: function() {
    console.log(this.name);
  }
}

console.log("sayName" in person1);

//na maioria dos casos o oeprador IN é a melhor solução para determinar se uma props existem em um objeto ou não, essa solução tem como vantagem não avaliar o valor da propriedade o que pode ser importante se uma prpriedade como essa puder causar um erro ou problema de desempenho.

//em outos casos, no entanto voce quer verificar a existencia de uma pripriedade somente se ela for uma prorpiedade propria, o operador IN verifica se ela é propria e tambem as propriedades de prototipos, para isso temos o hasOwnProperty(), eis aqui um exemplo de uso comparando os dois metodos: 
console.log("===================");
var person1 = {
  name: 'Waliston',
  sayName: function () {
    console.log(this.name);
  }
};

console.log("name" in person1);
console.log(person1.hasOwnProperty("name"));

console.log("toString" in person1);
console.log(person1.hasOwnProperty("toString"));

//REMOVENDO PROPRIEDADES
//assim como as propriedaddes podem ser adicionadas aos objetos em qualquer momento, tambem podemos deletar as mesmas a qualquer momento, e simplesmente coloando o valor NULL na mesma nao resolveo problema, pois ele ira chamar a propriedade [[sett]] e o novo "valor" será setado, para isso deveremos utilizar o DELETE. este operador atua em uma unica propriedade de objeto e chama uma operação interna com o mesmo nome [[delete]] => Você pode pensar nessa operação como a remoção de um par chave/valor de uma tabela hash <=

//o codigo a seguir mostra como o operador delete funciona: 
var person1 = {
  name: "Nicholas"
};

console.log("name in person1 ?" , "name" in person1, `O nome é ${person1.name} `);

delete person1.name

if("name" in person1) {
  console.log(this.name);
}
else{
  console.log("Nome apagado ou não existe");
}

//ENUMERAÇÃO

//por padrao todas as propriedades de um objeto por padrao sao enumeraveis , o que significa que voce pdoe iterar por ela usando um LOOP for-in. essas propriedades tem seu atributo interno [[Enumerable]] definido como true.

// => O loop for-in enumera todas as propriedades
//enumeráveis de um objeto, atribuindo o nome da propriedade a uma
//variável. por exemplo:

var property;
for( property in object) {
  console.log("Name:" + property);
  console.log("Value:" + object[property]);
}

///Se você precisar apenas de uma lista das propriedades de um objeto para
//usar posteriormente em seu programa, o ECMAScript5 introduziu o
//método Object.keys() para obter um array de nomes de propriedades
//enumeráveis, como mostrado a seguir:

var object = {
  p1: 1,
  p2: 2,
  p3: 3,
  p4: 4,
  p5: 5,
  p6: 6,
}

var properties = Object.keys(object);
//se quiser imitar o comportamento do loop for-in
var i, len;

for(i = 0, len = properties.length; i < len; i ++) {
  console.log("Name:" + properties[i]);
  console.log("Value:" + object[properties[i]]);
}
//Esse exemplo usa o método Object.keys() para obter as propriedades
//enumeráveis de um objeto ❶.
//Um loop for é então usado para iterar pelas
// propriedades e exibir o nome e o valor. Normalmente, Object.keys() será
// usado em situações em que você deseja operar sobre um array de nomes
// de propriedades e for-in quando não precisar de um array.

//=========

// Tenha em mente que nem todas as propriedades são enumeráveis. De fato,
// a maioria dos métodos nativos dos objetos tem o seu atributo
// [[Enumerable]] definido como false. Você pode verificar se uma propriedade
// é enumerável usando o método propertyIsEnumerable(), que está presente em
// todos os objetos:

var person1 = {
  name: "Nicholas"
}

console.log("name" in person1);
console.log(person1.propertyIsEnumerable("name"));

var properties = Object.keys(person1);

console.log("lenght" in properties)

console.log(properties.propertyIsEnumerable("lenght"));


//nesse caso a propriedade NAME é enumeravel, pois é uma propriedade propria definida em person1, já a lenght do array de properties não é pois a mesma consta somente em Array.protoype, no javascript vc verá que nem todas as propriedades que são nativas nao numeravies.

//TIPOS DE PROPRIEDADE

//Ha dois tipos de propriedade, propriedades de dados e propriedades de acesso...

//as propriedaded de dados contem um valor, como visto anteriormente no caso da propriedade NAME, o "comportamento-padrão" do metodo [[putt]] consiste em criar uma propriedade de dados, e ate agora todo o exemplo usado seegiu a mesma linha...

//as propriedades de acesso não contem valores; em vez disso, ela definem uma função a ser chamada quando a propriedade e lida (getter) e uma função quando a propriedade e atualizada(setter), as propriedades de acesso exigem somente um getter e um setter, embora ambas possam existir...

//existem uma sintaxe especial para as mesmas, a que vera no exemplo a seguir usando um objeto lieral:

var person1 = {
  _name: "Nicholas",
  get name() {
    console.log("Reading name");
    return this._name;
  },
  set name(value) {
    console.log("Setting name to %s", value);
    this._name = value;
  }
}

console.log(person1.name);

person1.name = "Greg";

console.log(person1.name);

//ATRIBUTOS DE PROPRIEDADES
//antigamente não havia uma maneira de especificar se uma propriedade deveria ser enumeravel porem tuso isso mudou no ES5(estamos no 6 kk), enfim no 5 varias maneiras de interagir diretamente com esses atributos forma criadas assim como novos atributos para suportar funcionalidades adicionais. atualemente é possivel criar propriedads do JS que se corportam como as que já tem criadas, iremnos estudar essas ppropriedades tanto as de acesso quanto as de dados começando com o que elas tem em comum:

//Atreibutos comuns:
//existem dois atributos comuns compartilhados entre propriedades de dados e as propriedades de acesso, é são eles [[enumerable]] & [[configurable]] uma propriedade configuravel pode ser excluido com o uso do DELETE e tambem pode ter seus atributios alterados a qualquer momentoo(isso tambem significa que uma propriedade pode passar de uma propriedade de dados para uma propriedade de acesso e vise-versa), por padrao, todas as propriedades sao configraveis e enumeraveis.

//se quiser mudar os atributos das propriedades, voce podera utilizar o metodo Object.defineProperty() este metodo aceita 3 "arguments" :
//1 > O objeto que tem a propriedade
//2 > O nome da propriedade
//3 > E um objeto DESCRITOR DA PROPRIEDADE que contem os atributos a serem definidos.
//OBS: na hora de mudar, os descritores não irao precisar vir com colchetes [] EX:

var person1 = {
  name: "Nicholas"
};
Object.defineProperty(person1, "name", {
  enumerable: false
});

console.log("name" in person1);
console.log(person1.propertyIsEnumerable("name"));

var properties = Object.keys(person1);
console.log(properties.length);

Object.defineProperty(person1, "name", {
  configurable: false
})

delete person1.name;

console.log("name" in person1);

console.log(person1.name);

Object.defineProperty(person1, "name", {
  configurable: true
})


//ATRIBUTOS DE PROPRIEDADES DE DADOS

//As prpriedadades de dados tem dois atributos adicionais que as pripriedades de accesso nao tem, o primeiro deles é o [[value]], que contem o valor da propriedade, esse atributo é preenchidp automaticamente quando uma propriedade é criada em um objeto. todos os valores são armazenados em [[value]] mesmo que esse valor seja uma função.

//O segundo é o atributo [[writable]], que é um valor booleano que indica que a propriedade podeser reescrita, por padrao ela sempre estar verdadeiro

//com esses dois atributos adicionais , voce pode definir completamente uma propriedade de um dados usando o Object.defineProperty(), mesmo que a propriedade ainda nao exista. considere esse codigo:

var person1 = {
  name: "Nicholas"
};

//esse mesmo codigo pode ser obtido com o codigo a seguir porem de maneira mais extensa, tendo em vista que muiutos deses atributos já retoram FALSE como padrao:

var person1 = {};

Object.defineProperty(person1, "name", {
  value: "Nicholas",
  enumerable: true,
  configurable: true,
  writable: true
});

//Quando Object.defineProperty() é chamado, inicialmente ele veri ca se a
//propriedade existe. Se não existir, uma nova propriedade será adicionada,
//com os atributos especi cados no descritor.
//Ao de nir uma nova propriedade usando Object.defineProperty(), é
//importante especificar todos os atributos porque, do contrário, os
//atributos booleanos serão de nidos automaticamente como false por
//padrão.

var person1 = {};
Object.defineProperty(person1, "name", {
  value: "Nicholas",
});

console.log("name" in person1);
console.log(person1.propertyIsEnumerable("name"));

delete person1.name;
console.log("name" in person1);

person1.name = "Greg";
console.log(person1.name);

//ATRIBUTOS DE PROPRIEDADES DE ACESSO
//as propriedades de acesso tambem tem dois atributos adicionais. cmo não há nenhum valor armazenado nessas propriedadess , os atributos [[value]] e [[writable]] não são necessários. em seu lugar as propriedades de acesso tem [[Get]] e [[Sett]] que contem as funções getter e setter e nescessitam de aapenas um dos dois para criar a propriedade.

//A vantagem de usar atributos de propriedades de acesso em vez de utilizar
//a notação literal de objeto para de nir as propriedades de acesso é que
//você também pode de nir essas propriedades em objetos que já existem.
//Se quiser usar a notação literal de objeto, você deve de nir as
//propriedades de acesso quando o objeto for criado.

//Como ocorre com as propriedades de dados, você também poderá
//especi car se as propriedades de acesso são con guráveis ou enumeráveis.
//Considere o seguinte código de um exemplo anterior:

var person1 = {
  _name: "Nicholas",
  get name() {
    console.log("Reading name");
    return this._name;
  },
  set name(value) {
    console.log("Setting name to %s", value);
    this._name = value;
  }
}

//Este codigo tambem pode ser escrito desta maneira:

var person1 = {
  _name: "Nicholas"
};

Object.defineProperty(person1, "name", {
  get: function() {
    console.log("Reading name");
    return this._name;
  },
  set: function(value) {
    console.log("Setting name to %s", value);
    this._name;
  },
  enumerable: true,
  configurable: true
})

/*
Note que os nomes das propriedades get e set do objeto passado para
Object.defineProperty() são propriedades de dados que contêm uma função.
O formato de objeto literal para a propriedade de acesso não pode ser
usado nesse caso.
De nir os outros atributos ([[Enumerable]] e [[Configurable]]) permite alterar
o modo como a propriedade de acesso funciona. Por exemplo, você pode
criar uma propriedade não con gurável, não enumerável e que não pode
ser atualizada desta maneira: */


var person1 = {
  _name: "Nicholas"
};

Object.defineProperty(person1, "name", {
  get: function() {
    console.log("reading name");
    return this._name;
  }
});

console.log("name" in person1);
console.log(person1.propertyIsEnumerable("name"));
delete person1.name
console.log("name" in person1);
person1.name = "Greg";
console.log(person1.name);

//Nesse código, name é uma propriedade de acesso que tem somente um
//getter ❶ . Não há setter nem outros atributos explicitamente de nidos
//como true, portanto o valor poderá ser lido, mas não poderá ser alterado.

//DEFININDO VARIAS PROPRIEDADES
//tambem é possivel definir varias propriedadss em um objeto simultaneamente se Object.defineProperties() for usado no lugar de Object.definieProperty(). Esse metodo aceita dois argumentos: o objeto que será usado  e um objeto contendo todas as informações das propriedades
//As chaves do segundo argumento correspondem aos nomes das
//propriedades de dados e os valores são objetos descritores que de nem os
//atributos dessas propriedades.

//por exemplo o codigo a seguir define duas propriedades:
var person1 = {};
Object.defineProperties(person1, {

  //propriedade de dados para armazenar informações
  _name: {
    value: "Nicholas",
    enumerable: true,
    configurable: true,
    writable: true
  },

  //propriedade de acesso
  name: {
    get: function() {
      console.log("Reading name");
      return this._name;
    },
    set: function(value) {
      console.log("Setting name to %s", value)
      this._name = value;
    },
    enumerable: true,
    configurable: true
  }
})

//OBTENDO ATRIBUTOS DE PROPRIEDADES
//Se houver necessidade de acessar os atributos das propriedades, isso poderá ser feito em JavaScript usando o método
//Object.getOwnPropertyDescriptor(). Como o nome sugere, esse método
//somente funciona com propriedades próprias. Ele aceita dois argumentos:
//o objeto a ser manipulado e o nome da propriedade a ser acessada.

var person1 = {
  name: "Nicholas"
}
var descritor = Object.getOwnPropertyDescriptor(person1, "name");

console.log(descritor.enumerable);
console.log(descritor.configurable);
console.log(descritor.writable);
console.log(descritor.value);

//EVITANDO MODIFICAÇÕES EM OBJETOS
//os objetos, assim como as propriedades, tem atributos internos que definem seu comportamento. um desses é o [[Extensible]] um valor booleano que indica se o objeto pode ser modificado, por padrao todos os objetos sao >extensiveis< o que signifca que novas propriedades podem ser adicionadas a qualquer momento, para evitar isso basta colocar o extensible como false certo ? existem 3 maneiras de conseguir esse resutado:

//EVITANDO EXTENSSSÕES
//uma maneira de criar objetos não extensiveis é com o método OBject.preventExtensions, ele aceita penas um valor que é o objeto que você deseja tornar não extensível. Assim que o esse metodo for utulizado, voce nuca mais será capaz de adicionar novas propriedade nele novamente. exemplo:

var person1 = {
  name: "Nicholas"
};

console.log(Object.isExtensible(person1));
Object.preventExtensions(person1);
console.log(Object.isExtensible(person1));

person1.sayName = function() {
  console.log(this.name);
}
 
console.log("sayName" in person1);

//SELANDO OBJETOS
//A segunda maneira de criar um objeto não extensível é selar o objeto. Um objeto sélado é não extensivel , e todas as suas propriedades não são configuraveis. Isso significa que voce na pode adicionar, remover nem mudar o tipo(de dados para acesso ou vise-versa) se um objeto estiver seado, voce ira apenas poder ler e atualizar as suas propriedades

//O método Object.seal() pode ser usado em um objeto para selá-lo.
//Quando isso acontecer, o atributo [[Extensible]] será definido como false e
//todas as propriedades terão seu atributo [[Configurable]] definido como false. exemplo:

var person1 = {
  name: "Nicholas"
}
console.log(Object.isExtensible(person1));
console.log(Object.isSealed(person1));

Object.seal(person1); //1
console.log(Object.isExtensible(person1)); //2

console.log(Object.isSealed(person1));

person1.sayName = function() { //3
  console.log(this.name);
}

console.log("sayName" in person1);

person1.name = "Greg"; //4
console.log(person1.name);;

delete person1.name;//5

console.log("name" in person1);
console.log(person1.name);

var descritor = Object.getOwnPropertyDescriptor(person1, "name");
console.log(descritor.configurable);

//De fato, objetos
//selados em JavaScript representam a maneira de permitir que você tenha
//o mesmo grau de controle sem usar classes.

//CONSGELANDO OBJETOS
//A última maneira de criar objetos não extensíveis é congelá-los. Se um objeto
//estiver congelado, não será possível adicionar nem remover propriedades,
//mudar seus tipos nem atualizar qualquer propriedade de dados.
//Essencialmente, um objeto congelado é um objeto selado em que as
//propriedades de dados também são apenas para leitura.
//para congelar um objeto podemos usar Object.freeze() e para cheacar se o mesmo está congelado, podemos estar usando Object.isFrozen(). Por exemplo:

var person1 = {
  name: "Nmicholas"
}

console.log(Object.isExtensible(person1));
console.log(Object.isSealed(person1));
console.log(Object.isFrozen(person1));

Object.freeze(person1);
console.log(Object.isExtensible(person1));
console.log(Object.isSealed(person1));
console.log(Object.isFrozen(person1));

person1.sayName = function() {
  console.log(this.name);
}

delete person1.name;
console.log("name" in person1);
console.log(person1.name);

var descritor = Object.getOwnPropertyDescriptor(person1, "name");

console.log(descritor.configurable);
console.log(descritor.writable);