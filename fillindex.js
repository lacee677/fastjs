function fillZeros(st){
	if((st.toString().length)<2) {
		return "0" + st.toString();
	}
	return st;
}

function getProgramFromTheServer(){
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET", "https://kadbudapest.hu/gombacache/?type=program");
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
  var descriptionNode = document.createElement("DIV");
  var organizerNode = document.createElement("DIV");
  var locationNode = document.createElement("DIV");
  var timeBlock = document.createElement("DIV");
  var timeStartNode = document.createElement("SPAN");
	var timeEndNode = document.createElement("SPAN");

  var startShow = fillZeros(start.getHours()) + ":" + fillZeros(start.getMinutes());
  var day = day(start.getDay());
	var endShow = ((new Date(end-start)).getMinutes() === 1)?"":" - " + fillZeros(end.getHours()) + ":" + fillZeros(end.getMinutes());
	var locShow = location ? location : "";
	var orgShow = organizer? organizer: "";
  var titleShow =title? title: "";
  var descriptionShow = description? description: "";

  mainNode.setAttribute("class", "items");
	locationNode.setAttribute("class", "location");
  dayNode.setAttribute("class", "day");
  timeStartNode.setAttribute("class", "programtime-start");
  timeStartNode.setAttribute("class", "programtime-end");
  organizerNode.setAttribute("class", "organizer")
  titleNode.setAttribute("class", "itemtitle");

  mainNode.appendChild(dayNode);
  mainNode.appendChild(titleNode);
  mainNode.appendChild(timeBlock);
  timeBlock.appendChild(timeStartNode);
  timeBlock.appendChild(timeEndNode);
  mainNode.appendChild(descriptionNode);
  mainNode.appendChild(locationNode);
  mainNode.appendChild(organizerNode);

  timeStartNode.innerHTML = startShow;
	timeEndNode.innerHTML = endShow;
  locationNode.innerHTML = "<b>Helyszin:</b> " + locShow;
  organizerNode.innerHTML = "<b>Partner:</b> " + orgShow;
  dayNode.innerHTML = day;
  titleNode.innerHTML = titleShow;
	descriptionNode.innerHTML = "<b>Leiras:</b><br>" + descriptionShow;

  return mainNode;
}
