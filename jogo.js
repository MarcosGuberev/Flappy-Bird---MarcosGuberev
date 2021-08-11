console.log('Marcos Guberev Flappy Bird');

let frames = 0; 

const som_Hit = new Audio(); 
som_Hit.src ='./efeitos/hit.wav'; 

const sprites = new Image();
sprites.src ='sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 276, 
  altura: 204,  
  x: 0, 
  y: canvas.height - 204, 
  desenha(){
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)
    contexto.drawImage(
      sprites, 
      planoDeFundo.spriteX, planoDeFundo.spriteY, 
      planoDeFundo.largura, planoDeFundo.altura, 
      planoDeFundo.x, planoDeFundo.y, 
      planoDeFundo.largura, planoDeFundo.altura, 
    
    );
    contexto.drawImage(
      sprites, 
      planoDeFundo.spriteX, planoDeFundo.spriteY, 
      planoDeFundo.largura, planoDeFundo.altura, 
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, 
      planoDeFundo.largura, planoDeFundo.altura, 
    
    );
  }
  
}

function criaChao() {
  const chao = {
    spriteX: 0, 
    spriteY: 609, 
    largura: 224,
    altura: 112, 
    x: 0, 
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1; 
      const repetemEm = chao.largura /2; 
      const movimentacao = chao.x - movimentoDoChao; 
      chao.x = chao.x - movimentoDoChao;
      console.log('[chao]', chao.x)

      chao.x = movimentacao % repetemEm; 
    },
    desenha(){
          contexto.drawImage(
            sprites, 
            globais.chao.spriteX, globais.chao.spriteY, 
            globais.chao.largura, globais.chao.altura, 
            globais.chao.x, globais.chao.y, 
            globais.chao.largura, globais.chao.altura, 
          ); 

          contexto.drawImage(
            sprites, 
            globais.chao.spriteX, globais.chao.spriteY, 
            globais.chao.largura, globais.chao.altura, 
            (globais.chao.x + globais.chao.largura), globais.chao.y, 
            globais.chao.largura, globais.chao.altura, 
          ); 
    },
  };
  return chao; 
}
    

  function fazColisao(flappyBird, chao){  
    const flappyBirdY = flappyBird.y + flappyBird.altura; 
    const chaoY = chao.y; 

    if (flappyBirdY >= chaoY){
      return true; 
    }
    return false; 
  }
  
  function criaFlappyBird(){
    const flappyBird = {
      spriteX: 0,
      spriteY: 0,
      largura: 33,
      altura: 24,
      x: 10,
      y: 50,
      pulo:  4.6, 
      pula(){
        console.log('antes', flappyBird.velocidade); 
        flappyBird.velocidade = - flappyBird.pulo;
        console.log('depois' , flappyBird.velocidade); 
      }, 
      gravidade: 0.25,
      velocidade: 0, 
      //algum comentario 
    
      atualiza(){
        if (fazColisao(flappyBird, globais.chao)){
          console.log('fez colisão'); 
          som_Hit.play();
          setTimeout(() => {
            mudaParaTela(telas.INICIO); 
          }, 500);
          
          return; 
        }
  
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade, 
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
      },
      movimentos: [
        {spriteX: 0, spriteY: 0 }, //asa para cima 
        {spriteX: 0, spriteY: 26, }, //asa no meio 
        {spriteX: 0, spriteY: 52, }, //asa para baixo 
        {spriteX: 0, spriteY: 26, }, //asa no meio 
      ], 
      frameAtual: 0, 
      atualizaFrameAtual(){
        
        const intervaloFrames =  10; 
        const passouIntervalo = frames % intervaloFrames === 0; 
        if(passouIntervalo){
          const baseDoIncremento = 1; 
          const incremento = baseDoIncremento + flappyBird.frameAtual; 
          const baseDaRepeticao = flappyBird.movimentos.length; 
          flappyBird.frameAtual = incremento % baseDaRepeticao; 
          console.log('frames', frames)
        }
      
      },
      desenha() {
        flappyBird.atualizaFrameAtual(); 
        const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];
        contexto.drawImage(
          sprites,
          spriteX, spriteY, // Sprite X, Sprite Y
          flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
          flappyBird.x, flappyBird.y,
          flappyBird.largura, flappyBird.altura,
        );
      },
    }
    return flappyBird; 
  }

 

  const mensagemGetReady = {
    spriteX: 133,
    spriteY: 0, 
    largura: 175,
    altura: 152,
    x: (canvas.width / 2 ) - 173 / 2, 
    y: 0,
    desenha(){
      contexto.drawImage(
        sprites, 
        mensagemGetReady.spriteX, mensagemGetReady.spriteY, 
        mensagemGetReady.largura, mensagemGetReady.altura, 
        mensagemGetReady.x, mensagemGetReady.y, 
        mensagemGetReady.largura, mensagemGetReady.altura, 
      );
    }

  }

  const globais = {};
   

  //telas 
  let telaAtiva = {}; 
  function mudaParaTela(novaTela){ 
    telaAtiva = novaTela;
    
    if(telaAtiva.inicializa){
      telaAtiva.inicializa()
    }

  }

  const telas = {
    INICIO: {
      inicializa(){
        globais.flappyBird = criaFlappyBird(); 
        globais.chao = criaChao();
      }, 

      desenha(){
        planoDeFundo.desenha(); 
      globais.chao.desenha();  
      globais.flappyBird.desenha(); 
        mensagemGetReady.desenha();
        
      },
      click(){
        mudaParaTela(telas.JOGO);
      }, 
      atualiza(){
        globais.chao.atualiza(); 
      }
    }
  }; 

  telas.JOGO = {
    desenha(){
      planoDeFundo.desenha(); 
      globais.chao.desenha();  
      globais.flappyBird.desenha(); 
    },
    click(){
      globais.flappyBird.pula(); 
    },
    atualiza(){
      globais.flappyBird.atualiza();
     
    },
  }


function loop (){
    telaAtiva.desenha(); 
    telaAtiva.atualiza(); 
    frames = frames + 1; 
    
    
    
    requestAnimationFrame(loop); 
     
    
}
window.addEventListener('click', function(){
if (telaAtiva.click) {
  telaAtiva.click(); 
}
});
mudaParaTela(telas.INICIO); 

 loop(); 