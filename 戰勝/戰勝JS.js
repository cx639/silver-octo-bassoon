
const story = [
	"哈哈!",
	"你贏了耶~~~",
	"恭喜恭喜",
	"不簡單吧~~",
	"嘻嘻",
	"但還是謝謝你這麼認真的玩我的遊戲",
	"雖然難度不低",
	"還難操作",
	"但你還是通關了",
	"不得不說你是真強阿",
	"當然~",
	"身為作者",
	"應當給通關者獎勵對吧",
	"這樣好了......",
	"如果你有幸看到這",
	"你就截個圖",
	"傳給我或給我看",
	"那我就請你喝飲料",
	"60元以內的喔",
	"不然我怕我破產......",
	"然後拜託是正常玩到獲勝才來跟我要喔",
	"不要作弊",
	"那就這樣啦",
	"祝你天天開心",
	"掰掰",
];

//找到HTML中id為text的物件並將其命名為story_text
const story_text = document.getElementById("text")

//設now_story_text為當前對話再story的編號
let now_story_text = 0

//設now_text為當前打到該對話的第幾個字
let now_text = 0


//設typing_speed為打字速度(毫秒)
const typing_speed = 250

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
		now_text = 0;type()},1000);
	}
	//如果打完最後的對話，則呼叫close_point()函數
	else{
		setTimeout(again_Button,1000);
	}
}

function again_Button(){
	let button = document.createElement("button");
	button.className="fill-btn";
	button.innerText = "再完一遍";

	document.body.appendChild(button);

	const Button = document.querySelector(".fill-btn");

    // 設定點擊事件
    Button.addEventListener("click", function() {
        window.location.href = "../彈幕遊戲HTML.html";
    });
}


//網頁開啟時便開始打字
setTimeout(type,);