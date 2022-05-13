const {KakaoLinkClient} = require("kakaolink");
const Kakao = new KakaoLinkClient("자바스크립트 키",'URL');
Kakao.login('카카오톡ID', 'PASSWD');

importClass(org.jsoup.Jsoup);

function getCoinMark(name) { //코인 정보 파싱
    var data = Utils.parse("https://api.upbit.com/v1/market/all").text();
    data = JSON.parse(data);

    for (var n = 0; n < data.length; n++) {
        if (data[n].market.startsWith("KRW-") && data[n].korean_name == name) 
        return data[n].market;   
    }
    return null;
};



function response(room, msg, sender, isGroupChat, replier, imageDB, packageName)
{
  
  var timestamp = Math.floor(+ new Date() / 1000);
  var cmd = msg.split(" ")[0]; // /코인
  var data = msg.replace(cmd + " ", "");// /코인 + "여기부분"

  
  if (cmd == "/코인") {
    
    var mark = getCoinMark(data);
    var name = data;

    if (mark == null) {
        replier.reply(data + " 라는 암호화폐를 찾을 수 없습니다.");
    }
    else {
        var data = Utils.parse("https://api.upbit.com/v1/ticker?markets=" + mark).text();
        data = JSON.parse(data);
        var coin_name = mark.substr(4);
        var ig = "https://imagechart.upbit.com/d/mini/"+coin_name+".png?t=("+timestamp+")";
        var trade_price = data[0].trade_price;
        var change_price = data[0].change_price;
        var change_rate = (String(data[0].change_rate*100)).substring(0,4);
        var plusMinus = "";
        var data2 = Utils.parse("https://fapi.bybt.com/api/futures/longShortRate?timeType=2&symbol=BTC").text();
        data2 = JSON.parse(data2);
        var long = data2.data[0].longRate;
        var short = data2.data[0].shortRate;
        
        var data2 = org.jsoup.Jsoup.connect("http://wiki.hash.kr/index.php/%ED%8C%8C%EC%9D%BC:"+name+"_%EB%A1%9C%EA%B3%A0.png").get(); //작은 아이콘 따오기
        var tiny_img = "http://wiki.hash.kr"+data2.select("#file > a > img").attr("src");
        
     
        if(data[0].change == "RISE")
            plusMinus = "+";

        else if(data[0].change == "FALL")
            plusMinus = "+";
            
        else if(data[0].change == "EVEN")
            plusMinus = "";

        Kakao.sendLink(room, {
        template_id: 73822, //템플릿 아이디 5자리
        template_args: {
             "title" : name ,"img" :  ig , "trade_price" : trade_price,
            "change_price" : plusMinus + change_price, "change_rate" : plusMinus + change_rate +"%",
            "long" : long + "%", "short" : short + "%" , "tiny_img" : tiny_img
             
           
        //카카오링크 태그
        }
        }, 'custom');
    }
  }
  
  
}