const hoteis = [
  {
    nome: "Lakewood",
    classificacao: 3,
    Reward : {
        semanaUtil: 80,
        finaldeSemana: 80
    },
    Regular:{
        semanaUtil: 110,
        finaldeSemana: 90
    } 


},  {
    nome: "Bridgewood",
    classificacao: 4,
    Reward : {
        semanaUtil: 110,
        finaldeSemana: 50
    },
    Regular:{
        semanaUtil: 160,
        finaldeSemana: 60
    }  

}, {
    nome: "Ridgewood",
    classificacao: 5,
    Reward : {
        semanaUtil: 100,
        finaldeSemana: 40
    },
    Regular:{
        semanaUtil: 220,
        finaldeSemana: 150
    }  

}
]
const nomesHoteis = hoteis.map(array => array.nome)

precosRegular = objeto => objeto.Regular
precosReward = objeto => objeto.Reward

const menuRegular = hoteis.map(precosRegular)
const menuReward = hoteis.map(precosReward)

precoFDS_r = objeto => objeto.finaldeSemana
precoSemanaUtil_r = objeto => objeto.semanaUtil

const menuRegularFDS        = menuRegular.map(precoFDS_r)
const menuRegularSemanaUtil = menuRegular.map(precoSemanaUtil_r)

precoFDS_R = objeto => objeto.finaldeSemana
precoSemanaUtil_R = objeto => objeto.semanaUtil

const menuRewardFDS        = menuReward.map(precoFDS_R)
const menuRewardSemanaUtil = menuReward.map(precoSemanaUtil_R)

duracaoEstadia = (chegada,partida) => (partida-chegada)/(1000*60*60*24)

const  preco_regular_semana = menuRegularSemanaUtil
const  preco_regular_fds    = menuRegularFDS
const  preco_reward_fds     = menuRewardFDS
const  preco_reward_semana  = menuRewardSemanaUtil

duracaoEstadia = (chegada,partida) => Math.round((partida-chegada)/(1000*60*60*24)+1)
function achaMenorValor(Total) {

  menorValor = Total.reduce((atual,seguinte) => atual < seguinte ? atual : seguinte)
  console.log("menor valor")
  console.log(menorValor)
  Total[2] == menorValor ? indice = 2 : Total[1] == menorValor ? indice = 1 : indice = 0
  console.log(Total)
  console.log(indice)   
  return indice 
}

function selecionaHotel(indice){
      melhorHotel = nomesHoteis[indice]
}

function precoTotal(precoSemana,precoFds) {
  console.log("finalmente chegamos ao preço Total")
  console.log("será que chegou correto o precoSemana?")
  console.log(precoSemana)
  console.log("será que chegou correto o precoFds?")
  console.log(precoFds)
  console.log("Como estão os sinalizadores para semana: "+global.sinalizador_EsteveEmDiadeSemana+ " e para fds: "+global.sinalizador_EsteveEmFimdeSemana )
  let Total = [0,0,0]
  if (global.sinalizador_EsteveEmDiadeSemana==1 && global.sinalizador_EsteveEmFimdeSemana==1) {   
      for (let i = 0; i < 3; i++){
          Total[i] = precoSemana[i] + precoFds[i]
      }
  }
  else {
      if (global.sinalizador_EsteveEmDiadeSemana==1 && global.sinalizador_EsteveEmFimdeSemana == 0){
          Total = precoSemana
      }
      else
          Total = precoFds

  }
  console.log("\n\n\n\n Custo Total das Estadias:")
  console.log(Total)

  indice_menorValor = achaMenorValor(Total)
  console.log("achamos o indice do menor valor: " + indice_menorValor)
  hotelEscolhido = selecionaHotel(indice_menorValor)   
}

function f_precoSemana(precoSemana,cliente) {
  if (cliente == 0){
      const intermediaria = menuRegular.map(objeto => objeto.semanaUtil)
      for (let i = 0; i< intermediaria.length; i++){
          precoSemana[i] += intermediaria[i]
      }
      
      return precoSemana
  }
  else{
      const intermediaria = menuReward.map(objeto => objeto.semanaUtil)
      for (let i = 0; i< intermediaria.length; i++){
          precoSemana[i] += intermediaria[i]
      }        
      return precoSemana
  }
}

function f_precoFds(precoFds,cliente){
  if (cliente == 0){
      const intermediaria = menuRegular.map(objeto => objeto.finaldeSemana)
      for (let i = 0; i< intermediaria.length; i++){
          precoFds[i] += intermediaria[i]
      }
      return precoFds
  }
  else{
      const intermediaria = menuReward.map(objeto => objeto.finaldeSemana)
      for (let i = 0; i< intermediaria.length; i++){
          precoFds[i] += intermediaria[i]
      }        
      return precoFds
  }
}

controleMeiodaSemana = (data,diasEstadia,precoSemana,precoFds,cliente) => {
  console.log("entrando no controle do meio da semana")
  console.log("verificando se primeiraChamada é zero: "+global.primeiraChamada)
  retornoControleSemana = precoSemana
  global.sinalizador_EsteveEmDiadeSemana = 1
  console.log("sinalizador "+global.sinalizador_EsteveEmDiadeSemana+" sinalizador FDS "+global.sinalizador_EsteveEmFimdeSemana+" retornoControleSemana "+retornoControleSemana)
  for(let i=data;i<6;i++){
      console.log("chegada no controle da semana")
      console.log("verificando se retornoControleSemana inicializou correntamente")
      console.log(retornoControleSemana)
      retornoControleSemana = f_precoSemana(precoSemana,cliente)
      console.log("verificando se retornoControleSemana atualizado corretamente")
      console.log(retornoControleSemana)
      diasEstadia--
      console.log("Dias faltando: "+diasEstadia)
      console.log(i+" de 5")
      if (diasEstadia == 0){
          i = 6
      
          console.log("atualizando valor do retornoControleSemana " + retornoControleSemana)
          console.log("dias acabaram no controle da semana. Chamando precoTotal")
          precoTotal(retornoControleSemana,precoFds)
      }
      else{
          if (i == 5){
              console.log("chamando começo do fds")
              comecoDoFds(data,diasEstadia,precoFds,retornoControleSemana,global.primeiraChamada,cliente)
          }
      }
  }
}

function comecoDaSemana(data,diasEstadia,precoSemana,precoFds,primeiraChamada,cliente){
  global.sinalizador_EsteveEmDiadeSemana = 1
  if (global.primeiraChamada == 1){
      console.log("Entrando no if que leva ao controle de onde começa na semana")
      console.log("primeiraChamada "+primeiraChamada )
      global.primeiraChamada = 0
      console.log("conferindo valores no if da semana para controle: data "+data+" diasEstadia "+diasEstadia+" precoSemana "+precoSemana+" precoFds "+precoFds+" cliente "+cliente)
      console.log("zerando primeiraChamada "+global.primeiraChamada)
      controleMeiodaSemana(data,diasEstadia,precoSemana,precoFds,cliente)
  }
  else{
      
      retornoComecodaSemana = precoSemana
      for(let i=1;i<6;i++){
          retornoComecodaSemana = f_precoSemana(retornoComecodaSemana,cliente)
          diasEstadia--
          console.log("quantos dias faltam")
          console.log(diasEstadia + " dias faltando")
          console.log("retornoComecodaSemana")
          console.log(retornoComecodaSemana)
          console.log(i + " de 5")
          if (diasEstadia == 0){
              i = 6
              console.log("entrou aqui na semana para fim de estadia")
              precoTotal(retornoComecodaSemana,precoFds)
          }
          else{
              if (i == 5){
                  console.log("vai chamar começodofds")
                  comecoDoFds(data,diasEstadia,precoFds,retornoComecodaSemana,primeiraChamada,cliente)
              }
          }
      }
  } 

}
controleMeiodoFDS = (data,diasEstadia,precoSemana,precoFds,cliente) => {
  
  global.sinalizador_EsteveEmFimdeSemana = 1
  console.log("o controle para o fds significa iniciar domingo. Será calculado o custo do domingo agora")
  retornoControleFds = f_precoFds(precoFds,cliente)    
  console.log("retornoControleFds - a variável que retorna o custo nessa chamada de controle")
  console.log(retornoControleFds)
  diasEstadia--
  console.log("é computado que passou um dia")
  console.log(diasEstadia)
  if (diasEstadia == 0){
          console.log("se chegamos a esse ponto é pq o cliente ficará só um dia")
          precoTotal(precoSemana,retornoControleFds)}
      else{
          console.log("Vamos sair do controle e seguir para a primeira segunda feira")
          comecoDaSemana(data,diasEstadia,precoSemana,retornoControleFds,primeiraChamada,cliente)
      }
      
}

function comecoDoFds(data,diasEstadia,precoFds,precoSemana,primeiraChamada,cliente){
  global.sinalizador_EsteveEmFimdeSemana = 1
  if (primeiraChamada == 1){
      console.log("chegamos no começo do fds")
      console.log("confirmando tipo de cliente: "+cliente)
      console.log(primeiraChamada)
      global.primeiraChamada = 0
      console.log("primeiro colocamados a flag em 0 e chamamos o controle")
      controleMeiodoFDS(data,diasEstadia,precoSemana,precoFds,cliente)
  }
  else{
      console.log("chegando no começo do fds")
      console.log("Sinalizador de fim de semana: "+global.sinalizador_EsteveEmFimdeSemana + " sinalizador de semana util: "+global.sinalizador_EsteveEmDiadeSemana)
      retornoComecodoFds = precoFds
      console.log("Ultima vez que foi computado custo do fds o resultado parou em:")
      console.log(retornoComecodoFds)
      for(let i=5;i<7;i++){
          console.log("inicio do calculo do fds. Estamos no dia:")
          console.log(i+" de 6")
          console.log("quantos dias ainda faltam.")
          retornoComecodoFds = f_precoFds(retornoComecodoFds,cliente)
          diasEstadia--
          console.log(diasEstadia + " dias faltando")
          console.log("retornoComecodoFds")
          console.log(retornoComecodoFds)
          if (diasEstadia == 0){
              console.log("chegou ao fim dos dias pelo comecodofds")
              i = 7
              precoTotal(precoSemana,retornoComecodoFds)
          }
          else{
              if (i == 6){
                  console.log("volta a chamar comecoDaSemana")
                  comecoDaSemana(data, diasEstadia,precoSemana, retornoComecodoFds, primeiraChamada, cliente)
              }
          }
      }
  } 
  
}

function chamaFuncoes_regular(chegada,partida,precosSemana,precosFds){
  var precoSemana = precosSemana;
  var precoFds = precosFds;
  diasEstadia = duracaoEstadia(chegada,partida);
  data = chegada.getDay();
  global.primeiraChamada = 1;
  cliente = 0;
  global.sinalizador_EsteveEmDiadeSemana = 0
  global.sinalizador_EsteveEmFimdeSemana = 0
  

  console.log("precoSemana")
  console.log(precoSemana)
  
  console.log("precoFds")
  console.log(precoFds)

  console.log("dias de Estadia")
  console.log(diasEstadia)
  
  console.log("data")
  console.log(data)

  console.log("primeira chamada")
  console.log(primeiraChamada)

  console.log("0 - Domingo - 6 Sábado")
  data > 0 && data < 6? comecoDaSemana(data,diasEstadia,precoSemana, precoFds,global.primeiraChamada,cliente) : comecoDoFds(data,diasEstadia,precoFds,precoSemana, primeiraChamada,cliente)
  
  
}

function chamaFuncoes_reward(chegada,partida,precosSemana,precosFds){
  var precoSemana = precosSemana;
  var precoFds = precosFds;
  diasEstadia = duracaoEstadia(chegada,partida);
  data = chegada.getDay();
  global.primeiraChamada = 1;
  cliente = 1;
  global.sinalizador_EsteveEmDiadeSemana = 0
  global.sinalizador_EsteveEmFimdeSemana = 0

  console.log("precoSemana "+precoSemana)
  
  console.log("precoFds "+precoFds)

  console.log("dias de Estadia "+diasEstadia)
  
  console.log("data "+data)

  console.log("primeira chamada "+primeiraChamada)

  console.log("0 - Domingo - 6 Sábado")
  if (data> 0 && data < 6){
      console.log("if do chama funções para chamando semana.")
      comecoDaSemana(data,diasEstadia,precoSemana,precoFds,primeiraChamada,cliente)
  }
  else{
      console.log("if do chama funções para chamando fds.")
      comecoDoFds(data,diasEstadia,precoFds,precoSemana,primeiraChamada,cliente)
  }
}

let Cliente1 = new Object(); 
Cliente1.chegada         = new Date("March 16,2009");
Cliente1.partida         = new Date("March 18,2009");
Cliente1.tipo_do_Cliente = "regular"

let Cliente2 = new Object(); 
Cliente2.chegada         = new Date("March 20,2009");
Cliente2.partida         = new Date("March 22,2009");
Cliente2.tipo_do_Cliente = "regular";

let Cliente3 = new Object() ; 
Cliente3.chegada         = new Date("March 26,2009");
Cliente3.partida         = new Date("March 28,2009");
Cliente3.tipo_do_Cliente = "reward";


Cliente = [Cliente1, Cliente2, Cliente3]

contagem = 0
while(contagem != 3){

if (Cliente[contagem].tipo_do_Cliente == "regular"){
  console.log("CHAMANDO funções para Cliente Regular.\n")
  console.log("Tabela de Preço Para FDS: " + preco_regular_fds+ "     Tabela de Preço Para Semana " + preco_regular_semana+"\n\n")
  chamaFuncoes_regular(Cliente[contagem].chegada, Cliente[contagem].partida, precoSemana=[0,0,0], precoFds=[0,0,0])
  console.log("\n\nCliente " + `${contagem+1}`+" Melhor hotel para cliente sem fidelidade para essas datas: "+global.melhorHotel+"\n\n\n")
}
else {
  console.log("CHAMANDO funções para Cliente Reward.\n")
  console.log("Tabela de Preço FDS " + preco_reward_fds+" Tabela de Preço Para Semana " + preco_reward_semana+"\n\n")
  chamaFuncoes_reward(Cliente[contagem].chegada, Cliente[contagem].partida, precoSemana=[0,0,0], precoFds=[0,0,0])
  console.log("\n\nCliente " + `${contagem+1}`+"     Melhor hotel para cliente com fidelidade para essas datas: "+global.melhorHotel+"\n\n\n")
}
contagem++ 
}