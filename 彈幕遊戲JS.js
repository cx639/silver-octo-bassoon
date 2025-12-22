const story = [
	"你好阿......人類",
	"今天天氣真不錯呢",
	"",
];

//找到HTML中id為text的物件並將其命名為story_text
const story_text = document.getElementById("text")

//設now_story_text為當前對話再story的編號
let now_story_text = 0

//設now_text為當前打到該對話的第幾個字
let now_text = 0


//設typing_speed為打字速度(毫秒)
const typing_speed = 150
//每段對話的間隔時間(毫秒)
const typ_speed = 1000
//敵方子彈生成的間隔時間(毫秒)
const attack_speed = 500

//設typing為是否正在打字
let typing = false;

//設fulltext為當前的對話
function type(){

	typing = true;

	//設fulltext為當前的對話
	const fulltext=story[now_story_text]

	//如果當前打的字數還小於該對話的總字數，則在story_text加入fulltext中對應的文字，並在打完該字後使now_text + 1
	if (now_text < fulltext.length){
		story_text.textContent +=fulltext.charAt(now_text);
		//如果字數到17則換行
		if (now_text === 17 ){
			story_text.textContent +="\n";
		}
		now_text++;

		//使用setTimeout(函數，時間(毫秒))函數重複執行typ()函數
		setTimeout(type,typing_speed);
	}

	else{
		typing=false;
		//使用setTimeout(函數，時間(毫秒))函數在[typ_speed]秒後執行next()函數
		setTimeout(next,typ_speed);
	}
}


function next(){

	now_story_text++;
	//如果當前打完的對話編號還小於總對話的總數 - 1 ，則清除story_text的內容，並設now_text = 0 ，與type()函數
	if (now_story_text < story.length){
		story_text.textContent = "";
		now_text = 0
		type();
	}
	else{
		//將文字全數刪除
		story_text.textContent = "";
		//使用setInterval(函數，時間(毫秒))函數在對話後每[attack_speed]秒後重複執行attack()函數
		setInterval(attack,attack_speed);
	}
}


//找到HTML中id為battle_space的物件並將其命名為battle_space_size
let battle_space_size= document.getElementById("battle_space");
//找到HTML中id為user的物件並將其命名為user_size
let user_size = document.getElementById("user");


//確認前二者的長寬
let bw = battle_space_size.offsetWidth;
let bh = battle_space_size.offsetHeight;
let pw = user_size.offsetWidth;
let ph = user_size.offsetHeight;

//相減得出玩家所能到達的最下與最右
let max_h = bh - ph;
console.log(max_h);
let max_w = bw - pw;
console.log(max_w);
//確認其最上及最左執會到0
let min_h = 0;
console.log(min_h);
let min_w = 0;
console.log(min_w);

//在整份網頁上新增觀察點擊按鍵的觀察者
let move = document.querySelector("body");
	move.addEventListener("keydown", function(event){

	//使初始位置是(0,0)
	let x = user_size.offsetLeft || 0;
	let y = user_size.offsetTop || 0;

	let key = event.key;
	let now_x=x;
	let now_y=y;
	//簡單的點上向上點下向下，但不能超出邊界
	switch(key){
		case "ArrowUp":
			now_y -= 10
			now_y = Math.max(now_y,min_h)
 			user_size.style.top = now_y + 'px';
			console.log(now_y);
			break;

		case "ArrowDown":
			now_y += 10
			now_y = Math.min(now_y,max_h)
			user_size.style.top = now_y + 'px';			
			break;
		
		case "ArrowLeft":
			now_x -= 10
			now_x = Math.max(now_x,min_w)
			user_size.style.left = now_x + 'px';
			break;
		
		case "ArrowRight":
			now_x += 10
			now_x = Math.min(now_x,max_w)
			user_size.style.left = now_x + 'px';
			break;
		}

});


function attack(){
	let max_h_attack = bh - 60;
	//在X為50,Y為battle_space_size5j的隨機高度中生成一個div
	let attack_y = Math.floor(Math.random() * max_h_attack);
	let attack_x = 50
	//創建一個div且設id為arms
	let attack = document.createElement("div");
	attack.className="arms";
	attack.style.left = attack_x + "px";
	attack.style.top = attack_y + "px";
	//生成在空間battle_space_up裡且3000豪秒後消失
	document.getElementById("battle_space_up").appendChild(attack);
	setTimeout(() => attack.remove(), 3000);
}



//網頁開啟時便開始打字
type();