function fillZeros(st){
	if((st.toString().length)<2) {
		return "0" + st.toString();
	}
	return st;
}

function getProgramFromTheServer(){
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET", "https://www.gombaszog.sk/api/program");
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4){
      if(xmlhttp.status === 200){
        var answer = JSON.parse(xmlhttp.responseText);
          console.log("Programok frissítve!");
          renderPrograms(answer);
      }
      else{
        console.log("Hiba: " + xmlhttp.statusText);
      }
    }
  }
  xmlhttp.send();
}

function renderPrograms(programs){
  var actProgram = document.getElementById("contentdiv");

  for(var i=0; i < programs.program.length; i++){
    actProgram.appendChild(programItemCreator(programs.program[i].name, programs.program[i].description, programs.program[i].partner, programs.program[i].location, new Date(programs.program[i].start), new Date(programs.program[i].end)));
  }
}

function programItemCreator(title, description, organizer, location, start, end){

  var days = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];

  function day(cday){ // day of the week
  	return days[cday];
  }

	var mainNode = document.createElement("DIV");

  var titleNode = document.createElement("DIV");
  var dayNode = document.createElement("DIV");
  var locationNode = document.createElement("span");
  var timeBlock = document.createElement("DIV");
  var timeStartNode = document.createElement("SPAN");
	var timeEndNode = document.createElement("SPAN");

  var startShow = fillZeros(start.getHours()) + ":" + fillZeros(start.getMinutes());
  var day = day(start.getDay());
	var endShow = ((new Date(end-start)).getMinutes() === 1)?"":" - " + fillZeros(end.getHours()) + ":" + fillZeros(end.getMinutes());
	var locShow = location ? location : "";
	var orgShow = organizer? organizer: "";
  var titleShow =title? title: "";

  var url = window.location.href;
  url = url.split("?");
  if(url[1]){
    parameter = url[1];
    if(parameter == '7'){
      parameter = '0';
    }
  }
  else{
    parameter = "";
  }

  
  var tempStart = '';
  if(parameter == 6){
    tempStart == 0;
  }
  else{
    tempStart = parseInt(parameter) + 1;
  }

  if(( start.getDay() == parseInt(parameter) && start.getHours() > 5 ) ||  ( start.getHours() < 5 && start.getDay() == tempStart) || parameter == ""){
    mainNode.setAttribute("class", "items");
  	locationNode.setAttribute("class", "location");
    timeStartNode.setAttribute("class", "programtime-start");
    timeStartNode.setAttribute("class", "programtime-end");
    titleNode.setAttribute("class", "itemtitle");

    mainNode.appendChild(titleNode);
    mainNode.appendChild(timeBlock);
    timeBlock.appendChild(locationNode);
    timeBlock.appendChild(timeStartNode);
    timeBlock.appendChild(timeEndNode);

    timeStartNode.innerHTML = startShow;
  	timeEndNode.innerHTML = endShow;
    locationNode.innerHTML = locShow + ' | ';
    titleNode.innerHTML = titleShow;
  }

  return mainNode;
}
