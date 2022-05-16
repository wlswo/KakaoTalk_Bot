const scriptName = " 던파캐릭검색";

const {KakaoLinkClient} = require("kakaolink");
const Kakao = new KakaoLinkClient("자바스크립트 키",'URL');
Kakao.login('카카오톡ID', 'PASSWD');

const Jsoup = org.jsoup.Jsoup; 

const apiKey = ""; // 던전앤파이터 본인의 apiKey
const serverList = {
	"카인": "cain",
	"디레지에": "diregie",
	"시로코": "siroco",
	"프레이": "prey",
	"카시야스": "casillas",
	"힐더": "hilder",
	"안톤": "anton",
	"바칼": "bakal",
    "전체": "all"
};

function serverId(server) { // 함수1
    try {
        var result = serverList[server];
        return result;
    } catch (e) {
        return "서버 정보를 찾을 수 없습니다.";
    }
}

function characterId(server, char_id) {
    try {
        var characterURL = "https://api.neople.co.kr/df/servers/"+
        serverId(server)+"/characters?characterName="+char_id+"&limit=<limit>&wordType=<wordType>&apikey=" + apiKey; 
        var parse = Jsoup.connect(characterURL).ignoreContentType(true).get().text();
        parse = JSON.parse(parse); 
        var characterId = parse["rows"][0]["characterId"];
        level  = parse["rows"][0]["level"];
        job   =  parse["rows"][0]["jobName"];
        job2  =  parse["rows"][0]["jobGrowName"];     
        
        return characterId;
    } catch (e) {
        return "캐릭터 코드를 가져오지 못했습니다.";
    }
}
var parse2;
var level;
var job;
var job2;


function response(room, msg, sender, isGroupChat, replier, imageDB, packageName)
{
  
  if (msg.startsWith("/서버")){  // /서버/프레이/캐릭명
    var server_id = msg.split("/");
    var server = server_id[2];   //  프레이 
    var char_id = server_id[3];  //
    var cheak = serverId(server);
    
    
    if(cheak == null){
        replier.reply("서버잘못입력")
    }
    else{
        var c_ID    = characterId(server, char_id);
        var img = "https://img-api.neople.co.kr/df/servers/"+serverId(server)+"/characters/"+
                   c_ID+"?zoom=<zoom>";
       
        Kakao.sendLink(room, {
        template_id: , //템플릿 아이디 5자리
        template_args: {     "server" : server , "img" : img , 
                             "job"  : job , "job2" : job2 , "id" : char_id, "level" :level
         //카카오링크 태그
        }
        }, 'custom');
    }

  } 
  
  
}