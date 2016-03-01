window.addEventListener('load',init);
var elementomove;
var puntaje;
var puntos=0;
var puntosPerdidos=0;
var bandera=false;
var intentos=0;


function init() {

	for (var i = 0; i <10; i++) {
		GenerarId();
	}
	document.getElementById("btnclose").addEventListener("click",closeDialog);
	puntaje=document.getElementById("Puntaje");
	puntaje.innerHTML="Puntaje :  "+puntos;
	var contenedores=document.getElementsByClassName("hijo");	
	for (var i in contenedores) {

		var contenedor = contenedores[i];

		if (typeof contenedor.style != "undefined" ) {

			contenedor.addEventListener('dragenter',enter,false);
			contenedor.addEventListener('dragover',over,false);
	        contenedor.addEventListener('dragleave',leave,false);      
	        contenedor.addEventListener('drop',drop,false);
		}
		
	}

	var arrastables = document.getElementsByClassName("cuadradito");
	for (var i in arrastables) {

		var arrastable = arrastables[i];

		if (typeof arrastable.style != "undefined" ) {

			arrastable.addEventListener('dragstart',start,false);
	        arrastable.addEventListener('dragend',end,false);
		}
		
	}
	

}

function start(e) {

	e.target.style.border = '3px dotted #555';
	elementomove=this;
	var padre = document.createElement('p');
	var clon = this.cloneNode(true);
	padre.appendChild(clon);
	e.dataTransfer.setData('text',padre.innerHTML); 
}

function end(e) {

	e.target.style.border = ''; 
}


function enter(e) {
			
}

function leave(e) {
	e.target.style.border = ''; 
}

function over(e) {

	e.preventDefault();

	var elemArrastrable = elementomove.getAttribute("class");
	console.log(elemArrastrable);
	var id = e.target.id; // Elemento sobre el que se arrastra
	if ((id == "verde" ) && (elemArrastrable == "cuadradito arrastrable2")){
		bandera=true;
		e.target.style.border = '3px dotted #555'; 
		return false;
	}	

	if ((id == "azul") && (elemArrastrable == "cuadradito arrastrable1")){
		bandera=true;
		e.target.style.border = '3px dotted #555'; 
		return false;
	}

	if ((id == "gris") && (elemArrastrable == "cuadradito arrastrable3")){
		bandera=true;
		e.target.style.border = '3px dotted #555'; 
		return false;
	}

	bandera=false;
		
		
}

function drop(e){

	e.preventDefault();
	var datos = e.dataTransfer.getData('text');
	//this.innerHTML+=datos;
	elementomove.parentNode.removeChild(elementomove);
	e.target.style.border = ''; 
	PuntajeUpdate();
	
}




function GenerarId() {

	var aleatorio = Math.round(Math.random()*2)+1;

	switch(aleatorio) {

	case 1:

		var midiv = document.createElement("div");
		midiv.setAttribute("class","cuadradito arrastrable1");
		
		midiv.setAttribute("draggable","true");
		midiv.innerHTML = "1"; 
	    document.getElementById('bolsa').appendChild(midiv);
	    
	    break;

	case 2:

		var midiv = document.createElement("div");
		midiv.setAttribute("class","cuadradito arrastrable2");
		
		midiv.setAttribute("draggable","true");
		midiv.innerHTML = "2";
	    document.getElementById('bolsa').appendChild(midiv);

	    break;
	    
	default:

	    var midiv = document.createElement("div");
		midiv.setAttribute("class","cuadradito arrastrable3");
		
		midiv.setAttribute("draggable","true");
		midiv.innerHTML = "3"; 
	    document.getElementById('bolsa').appendChild(midiv);
	    break;
	}

	
}

function PuntajeUpdate() {

	intentos=intentos+1;
	if (bandera) {
		puntos=puntos+1;
		puntaje.innerHTML="Puntaje :  "+puntos;	
	}

	if(puntos==10){

		document.getElementById("mensaje").innerHTML="Ganaste !"
		document.getElementById("ok").showModal(); 

	}else if(intentos==10){

		document.getElementById("ok").showModal(); 
	}
		
}
		
function closeDialog(){

	puntos=0;
	GenerarId();
	puntaje.innerHTML="Puntaje :  "+puntos;	
	document.getElementById("ok").close();
	
}

