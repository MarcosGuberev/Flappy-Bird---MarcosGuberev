console.log('Marcos Guberev Flappy Bird');

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


    const chao = {
    spriteX: 0, 
    spriteY: 609, 
    largura: 224,
    altura: 112, 
    x: 0, 
    y: canvas.height - 112,
    desenha(){
          contexto.drawImage(
            sprites, 
            chao.spriteX, chao.spriteY, 
            chao.largura, chao.altura, 
            chao.x, chao.y, 
            chao.largura, chao.altura, 
          ); 

          contexto.drawImage(
            sprites, 
            chao.spriteX, chao.spriteY, 
            chao.largura, chao.altura, 
            (chao.x + chao.largura), chao.y, 
            chao.largura, chao.altura, 
          ); 
    }
  }

  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0, 
    //algum comentario 
  
    atualiza(){
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade, 
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha() {
      contexto.drawImage(
        sprites,
        flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
      );
    }
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

  //telas 
  let telaAtiva = {}; 
  function mudaParaTela(novaTela){ 
    telaAtiva = novaTela; 

  }

  const telas = {
    INICIO: {
      desenha(){
        planoDeFundo.desenha(); 
      chao.desenha();  
      flappyBird.desenha(); 
        mensagemGetReady.desenha();
        
      },
      click(){
        mudaParaTela(telas.JOGO);
      }, 
      atualiza(){

      }
    }
  }; 

  telas.JOGO = {
    desenha(){
      planoDeFundo.desenha(); 
      chao.desenha();  
      flappyBird.desenha(); 
    },
    atualiza(){
      flappyBird.atualiza();
    }
  }


function loop (){
    telaAtiva.desenha(); 
    telaAtiva.atualiza(); 

    
    
    
    requestAnimationFrame(loop); 
     
    
}
window.addEventListener('click', function(){
if (telaAtiva.click) {
  telaAtiva.click(); 
}
});
mudaParaTela(telas.INICIO); 

 loop(); 