let A = [];
let M = [];
let K= [];
let Img = [];
let Memmory = [0,0,0];

onload = function () {
    Arr(4);
    Tbl(4);
    setTimeout(Timer,1500);
}

setTimeout(Hide,1500);


function Arr(n) {
    let x,k=1;
    for(let i=0;i<16;i++){
        k = k > 8 ? 1 : k;
        A[i] = k++;
    }

    for(let i=0;i<n;i++) {
        M[i]=[];
        Img[i]=[];
        K[i] = [];
        for(let j=0;j<n;j++) {
            x=Math.floor(Math.random()*A.length);
            M[i][j] = A[x];
            Img[i][j] = A[x];
            A.splice(x,1);
            
        }
        
    }
}

function Tbl(n) {
    let tbl = "";
   
    for(let i=0 ;i<n;i++) {
        tbl +="<tr>";
        for(let j=0 ;j<n;j++) {
            tbl += `<td><img id="A${i}_${j}" src="img/${M[i][j]}.png" onclick="Click(${i},${j})" /></td>`;
        }
        tbl += "</tr>"
    }
    document.getElementsByTagName('table')[0].innerHTML = tbl;
}

function Hide() {
    for(let i=0 ;i<4;i++) {
        for(let j=0 ;j<4;j++) {
           M[i][j] = 0;
        }
    }
    Tbl(4);
}


function Click(i, j) {
    M[i][j] = Img[i][j];
    Tbl(4);
    if (Memmory[2] == 0) {
      Memmory[0] = i;
      Memmory[1] = j;
      Memmory[2] = Img[i][j];
    } else {
      if (Memmory[2] != Img[i][j] || (Memmory[0] == i && Memmory[1] == j)) {
        M[i][j] = 0;
        M[Memmory[0]][Memmory[1]] = 0;
        setTimeout(function() {
          Tbl(4);
          Sil();
        }, 500);
      } else {
        K[i][j] = 1;
        K[Memmory[0]][Memmory[1]] = 1;
      }
  
      Memmory[2] = 0;
    }
    Sil();
  }
  
  function Sil() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (K[i][j] == 1) {
          document.getElementById(`A${i}_${j}`).removeAttribute("onclick");
        }
      }
    }
  }
  

  


  function Timer() {
    let sec = 50;
    

    document.getElementById('sec').style.opacity = '1';

    let againBtn = document.getElementById('button');
    let secDiv = document.getElementById('timer');
    secDiv.textContent = sec;

    let interval = setInterval(()=>{
      sec--;
      secDiv.textContent = sec;


      //Win

      let say = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (K[i][j] == 1) {
           say++;
          }
        }
      }
      if(say==16) {
        alert('win');
        clearInterval(interval);
        againBtn.style.opacity='1';
      }



      //Lose

      if(secDiv.textContent == '0') {
        alert("you lose(((");
        clearInterval(interval);
        
        Hide();

        
        againBtn.style.opacity='1';

        againBtn.addEventListener('click',()=>{
          Arr(4);
          Tbl(4);
          setTimeout(Hide,1500);
          setTimeout(Timer,1500);
          againBtn.style.opacity = '0';
        });

      }


    },1000);
    
    

  };


  