const scriptName = "주식";

const {KakaoLinkClient} = require("kakaolink");
const Kakao = new KakaoLinkClient("자바스크립트 키",'URL');
Kakao.login('카카오톡ID', 'PASSWD');



function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    var timestamp = Math.floor(+ new Date() / 1000);
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    var data3 = data;
    var name = "";
    var price = "";
    var rate = "";
    var prev_price ="";
    var volume ="";
    
    if (cmd == "/주식") {
        try {
        var data = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=%EC%A3%BC%EC%8B%9D+"
                 + data).get();


        name = data.select("a.tit_name").get(0).text(); //주식명
        price = data.select("#comColl > div.coll_cont > div > div.wrap_tit > div > span.num_stock").text();
        rate  = data.select("#comColl > div.coll_cont > div > div.wrap_tit > div > span.num_rate").get(0).text(); 
        if(rate.substring(0,2) =="상승"){
            rate = '📈 +'+rate.substr(2);
        }
        else if(rate.substring(0,2) == "하락"){
            rate = '📉 -'+rate.substr(2);
            
        } 
        var img = data.select("#stockTabImg").attr("src")+"?t=("+timestamp+")";
        prev_price = data.select("#comColl > div.coll_cont > div > div:nth-child(3) > div.info_updown > div:nth-child(1) > dl:nth-child(5) > dd").text();    
        volume = data.select("#comColl > div.coll_cont > div > div:nth-child(3) > div.info_updown > div:nth-child(1) > dl:nth-child(6) > dd").text();
        data2 = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query="+data3+"&oquery=lg&tqi=hCcacwprvhGssOSA%2FF4ssssstcC-471608").get();
        
        var tiny_img = data2.select("#main_pack > section.sc_new.sp_nsite._project_site_channel_root._section_nsite_._sp_ntotal._prs_vsd_bas > div > div > div.nsite_tit > div > div.nsite_source > a > span.thumb > img").attr("src");
        
        Kakao.sendLink(room, {
        template_id: , //템플릿 아이디 5자리
        template_args: { "name" : name, "rate" : rate, "prev_price" : prev_price,
                        "price" : price , "volume" : volume, "img" : img ,"tiny_img" : tiny_img
           
        //카카오링크 태그
        }
        }, 'custom');
        
    } catch (e) {
        replier.reply("주식 정보 불러오기 실패");
    }
    
  }
}