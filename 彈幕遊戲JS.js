const story = [
	[
		"你好阿......人類",
		"今天天氣真不錯呢",
		"看看窗外吧~~",
		"......",
		"看完了嗎?",
		"就當你看完了吧",
		"那我們來玩個遊戲吧",
		"等等你左邊會生成一些箭頭",
		"盡量去碰它們",
		"會很很舒服的喔",
	],
	[
		"!?......",
		"竟然還活著嗎",
		"可惡...",
		"沒被我騙到嗎?",
		"真有趣呢~",
		"那就繼續吧",
	],
	[
		"!!!",
		"我地媽媽咪呀!!!",
		"你竟然還活著!!!???",
		"......",
		"難以置信~~~",
		"可惜......",
		"應該也就這樣了",
	],
	[
		"!!!!!",
		"沒死!!!???",
		"你真厲害!!!",
		"那麼......",
		"我要出全力了喔",
		"來吧",
		"最後一戰",
	],
	[
		"......",
		"謝謝你擊敗了我",
		"下次見",
	],
];


//找到HTML中id為text的物件並將其命名為story_text
const story_text = document.getElementById("text")

let now_big_story_text = 0

//設now_story_text為當前對話再story的編號
let now_story_text = 0

//設now_text為當前打到該對話的第幾個字
let now_text = 0


//設typing_speed為打字速度(毫秒)
const typing_speed = 150
//每段對話的間隔時間(毫秒)
const typ_speed = 1000
//敵方子彈生成的間隔時間(毫秒)
const attack_speed = 800

//設typing為是否正在打字
let typing = false;

//設fulltext為當前的對話
function type(){
	typing = true;
	if (now_big_story_text < story.length){		
		//設fulltext為當前的對話
		const fulltext=story[now_big_story_text][now_story_text]

		//如果當前打的字數還小於該對話的總字數，則在story_text加入fulltext中對應的文字，並在打完該字後使now_text + 1
		if (now_text < fulltext.length){
			console.log(now_big_story_text);
			console.log(now_story_text);
			console.log(fulltext.length);
			console.log(now_text);
			console.log(story.length);
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
	else{
			console.log("結束");
			win();
		}
}

function next(){
	now_story_text++;
	//如果當前打完的對話編號還小於總對話的總數 - 1 ，則清除story_text的內容，並設now_text = 0 ，與type()函數
	if (now_story_text < story[now_big_story_text].length){
		story_text.textContent = "";
		now_text = 0
		type();
		}
	else{
		//將文字全數刪除
		story_text.textContent = "";
		now_story_text = 0
		now_text = 0
		//使用setInterval(函數，時間(毫秒))函數在對話後每[attack_speed]秒後重複執行attack()函數
		setTimeout(battle,attack_speed)
		let Detection = setInterval(impact,10);
		setInterval(()=>{clearInterval(Detection)},8500);
	}
}

//找到HTML中id為battle_space的物件並將其命名為battle_space_size
let battle_space_size= document.getElementById("battle_space");
//找到HTML中id為user的物件並將其命名為user_size
let user_size = document.getElementById("user");
//找到HTML中id為user的物件並將其命名為user_size

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

function attack_1(){
	let max_h_attack_1 = bh - 60;
	//在X為50,Y為battle_space_size5j的隨機高度中生成一個div
	let attack_1_y = max_h_attack_1/2;
	let attack_1_x = 50
	//創建一個div且設類別為bullet
	let attack_1 = document.createElement("div");
	attack_1.className="bolltom_1  bullet";
	attack_1.style.left = attack_1_x + "px";
	attack_1.style.top = attack_1_y + "px";
	//生成在空間battle_space_up裡且2000豪秒後消失
	document.getElementById("battle_space_up").appendChild(attack_1);
	setTimeout(() => attack_1.remove(), 3500);
}

function attack_2(){
	let min_w_attack_2 = btw*0.2;
	let max_w_attack_2 = btw*0.8;
	//在X為50,Y為battle_space_size5j的隨機高度中生成一個div
	let attack_2_x = Math.floor(Math.random() * (max_w_attack_2 - min_w_attack_2))+min_w_attack_2;
	let attack_2_y = 0;
	let attack_2_z = 999;
	//創建一個div且設類別為bullet
	let attack_2 = document.createElement("div");
	attack_2.className="bolltom_2  bullet";
	attack_2.style.left = attack_2_x + "px";
	attack_2.style.top = attack_2_y + "px";
	attack_2.style.zIndex = attack_2_z ;
	//生成在空間battle_space_up裡且2000豪秒後消失
	document.getElementById("battle_space_top").appendChild(attack_2);
	setTimeout(() => attack_2.remove(), 2000);
}

function attack_3(){
	let max_h_attack_3 = bh - 60;
	//在X為50,Y為battle_space_size5j的隨機高度中生成一個div
	let attack_3_y = Math.floor(Math.random() * max_h_attack_3);
	let attack_3_x = 50
	//創建一個div且設類別為bullet
	let attack_3 = document.createElement("div");
	attack_3.className="bolltom_1  bullet";
	attack_3.style.left = attack_3_x + "px";
	attack_3.style.top = attack_3_y + "px";
	//生成在空間battle_space_up裡且2000豪秒後消失
	document.getElementById("battle_space_up").appendChild(attack_3);
	setTimeout(() => attack_3.remove(), 3500);
}

function attack_4(){
	attack_3();
	attack_2();
}


function attack_5(){
	now_big_story_text++;
	type();
}

let attack_list=[attack_1,attack_2,attack_3,attack_4,attack_5];
let now_attack=0;


let battle_space_top_size= document.getElementById("battle_space_top");
let btw = battle_space_top_size.offsetWidth;

function battle(){
	const attack = setInterval(() => {attack_list[now_attack]();}, 500);
	setTimeout(()=>{clearInterval(attack);now_big_story_text ++;setTimeout(()=>{type();now_attack++},3500);},5000);
}


function impact(){
	let user_Location = user_size.getBoundingClientRect();
	
	let all_bolltom =  document.querySelectorAll(".bullet");

	all_bolltom.forEach((one_bolltom) =>{

		let bullet_Location = one_bolltom.getBoundingClientRect();

		let x_not_impact= bullet_Location.left    >  user_Location.right || bullet_Location.right   <  user_Location.left;
		let y_not_impact= bullet_Location.bottom  <  user_Location.top   || bullet_Location.top     >  user_Location.bottom;
		let impacting = !(x_not_impact) && !(y_not_impact);

		if (impacting){
			window.location.href="戰敗/戰敗HTML.html";
		}
	});
}

function win(){
	window.location.href="win.html";
}

//網頁開啟時便開始打字
type();

