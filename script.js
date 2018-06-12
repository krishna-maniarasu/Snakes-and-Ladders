var UIController=(function(){
    var cont={
            statement:false,
             value:0,
            gameOver:1
        };
    var deleteCoin=function(pre,act){
       var d=document.querySelector('.head-'+act);
       d.parentNode.removeChild(d);
   };
    var checking=function(now){
       
        var a,b,c;
        a=[4,9,17,20,28,40,54,62,63,64,71,87,93,95,99];
         b=[14,31,7,38,84,59,34,18,81,60,91,24,73,75,78]
      c=a.indexOf(now);
        if(c===-1)
            { cont.statement=false;
            cont.value=0;
            }
        else{
            cont.statement=true;
            cont.value=b[c];
        }
    };
  var changecoin=function(previous,now,active){
     var html,newHtml,del;
        if(now<=100){ 
                if(now!==1){
                   deleteCoin(previous,active);    
                   }
             if(active===0){
                 html='<div class="head-%active%"><img src="coin0.png"style="height:25px;padding-top:3px; float:%side%; border-radius:50%" class="coin%c%"></div>';      
                 newHtml=html.replace('%side%','left');
                 newHtml=newHtml.replace('%c%',active)
                }
             else{
                html='<div class="head-%active%"><img src="coin1.png" style="height:25px;padding-top:3px; float:%side%; border-radius:50%" class="coin%c%"></div>';
                newHtml=html.replace('%side%','right');
                newHtml=newHtml.replace('%c%',active);
            
                 }
              newHtml=newHtml.replace('%active%',active);
              document.querySelector('#box-'+now).insertAdjacentHTML('beforeend',newHtml);
            if(now===100){
                document.querySelector('.winner').textContent='Player '+(active+1)+' wins';
                 cont.gameOver=0;
            }
        }
      };

    return{
        del:function(pre,act){
            deleteCoin(pre,act);  
        },
      changePosition:function(previous,now,active){
           changecoin(previous,now,active); 
      },
        check:function(now){
              checking(now);
        },
       getCont:function(){
           return cont;
       }
        
    };
    
})();
 
var controller=(function(UICtrl){
    var score,gamePlaying,activePlayer;
    
    var setUp=function(){
       score=[1,1];
        gamePlaying=[0,0];
        activePlayer=0;
         document.querySelector('.winner').textContent='';
 
    
       
    };

    var setListener=function(){
            var ran,current,end,dataValue;
         dataValue=UICtrl.getCont();
          document.querySelector('.btn-new').addEventListener('click',function(){
                      if(gamePlaying[0]||gamePlaying[1]){
                 if(gamePlaying[0]){
                  UICtrl.del(score[0],0);   
                }
               if(gamePlaying[1])
                {
                UICtrl.del(score[1],1);
                }
              setUp();
                          
              }
           document.querySelector('.dice').src="dice-"+1+".png";  
             
          });
        
        document.querySelector('.btn-roll').addEventListener('click',function(){
           dataValue=UICtrl.getCont();
            if(dataValue.gameOver!==0)
           { 
            ran=Math.floor(Math.random()*6)+1;
          
           console.log('next'+ran);
            if(ran===1 && gamePlaying[activePlayer]!=1)
                {        
                    UICtrl.changePosition(0,1,activePlayer); 
                    document.querySelector('.dice').src="dice-"+ran+".png";   
                     gamePlaying[activePlayer]=1;
                    nextPlayer();
                }
            else if(gamePlaying[activePlayer]===1)
            {  
                if(score[activePlayer]+ran <=100){
                   current=score[activePlayer];
                    score[activePlayer]+=ran;
                    UICtrl.changePosition(current,score[activePlayer],activePlayer);
                setTimeout(UICtrl.check(score[activePlayer]),3000);
                     dataValue=UICtrl.getCont();
                    if(dataValue.statement)
                        {
                             UICtrl.changePosition(score[activePlayer],dataValue.value,activePlayer);
                            score[activePlayer]=dataValue.value;
                        }
                    
                 }
                document.querySelector('.dice').src="dice-"+ran+".png";
                console.log(activePlayer);
                nextPlayer();
                
            }
            else{
                nextPlayer();
                document.querySelector('.dice').src="dice-"+ran+".png";
            }
           }
        });
        
    };
    var nextPlayer=function(){
     activePlayer!=0 ? activePlayer=0 : activePlayer=1 
        
    };
    
    return {
        init:function(){
          setUp();
         setListener();
         console.log("started"); 
       },
        testActive: function(){
            console.log(activePlayer);
        } 
    };
})(UIController);
controller.init();