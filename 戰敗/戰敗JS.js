//用列表的方式呈現對話或劇情
const story = [
	"哈哈哈!",
	"你輸囉~",
	"小菜雞~~~",

];

//找到HTML中id為text的物件並將其命名為story_text
const story_text = document.getElementById("text")

//設now_story_text為當前對話再story的編號
let now_story_text = 0

//設now_text為當前打到該對話的第幾個字
let now_text = 0


//設typing_speed為打字速度(毫秒)
const typing_speed = 500

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

		now_text++;

		//使用setTimeout(函數，時間(毫秒))函數重複執行typ()函數
		setTimeout(type,typing_speed);
	}

	else{
		next()
		typing=false;
	}
}


function next(){

	now_story_text++;
	//如果當前打完的對話編號還小於總對話的總數 - 1 ，則清除story_text的內容，並設now_text = 0 ，最後在呼叫close_point()與type()函數
	if (now_story_text < story.length){
		setTimeout(()=>{story_text.textContent = "";
		now_text = 0;type()},500);
	}
	//如果打完最後的對話，則呼叫close_point()函數
	else{
		again_Button()
	}
}

function again_Button(){
	let button = document.createElement("button");
	button.className="fill-btn";
	button.innerText = "再來!!";

	document.body.appendChild(button);

	const Button = document.querySelector(".fill-btn");

    // 設定點擊事件
    Button.addEventListener("click", function() {
        window.location.href = "../彈幕遊戲HTML.html";
    });
}

	

//網頁開啟時便開始打字
setTimeout(type,3500);