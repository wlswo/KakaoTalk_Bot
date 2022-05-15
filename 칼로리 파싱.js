

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName)
{
  
  var cmd = msg.split(" ")[0]; 
  var data = msg.replace(cmd + " ", "");

  
  if (cmd == "/칼로리") {

       
      var data = org.jsoup.Jsoup.connect("https://www.dietshin.com/calorie/calorie_search.asp?keyword=" + data).get();
      var calorie = data.select("#container > div.contents.calorieDc > table > tbody").get(0).text();


      var calorie_list = calorie.split("kcal");
      var tot ="";
      
      for(var i=0; i<calorie_list.length-1; i++){              
             tot += "⚫"+ calorie_list[i] +"kcal\n"; 
      } 

      replier.reply(tot);
             

    }
    
}