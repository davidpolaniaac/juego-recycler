window.addEventListener('load',init);
var elementomove;
var puntaje;
var puntos=0;
var puntosPerdidos=0;
var bandera=false;
var intentos=0;
var elemSelecciono;

function init() {




    Data();

	for (var i = 0; i <10; i++) {
		GenerarId();
	}
    var dialog = document.getElementById('windowInt');
	document.getElementById('intrucciones').addEventListener("click",intrucciones);
	document.getElementById('exitInt').onclick = function() {
		dialog.close();
	};


	var dialogPuntajes = document.getElementById('windowPuntajes');
	document.getElementById('puntajesHist').addEventListener("click",WinPuntajes);
	document.getElementById('exitPuntajes').onclick = function() {
		dialogPuntajes.close();
	};
	

	var dialogCreditos = document.getElementById('windowCredi');

	document.getElementById('creditos').onclick = function() {
		dialogCreditos.showModal();
	};

	document.getElementById('exitCre').onclick = function() {
		dialogCreditos.close();
	};

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
	        contenedor.addEventListener('click',SeleccionoContenedor,false);
		}
		
	}

	var arrastables = document.getElementsByClassName("cuadradito");
	for (var i in arrastables) {

		var arrastable = arrastables[i];

		if (typeof arrastable.style != "undefined" ) {

			arrastable.addEventListener('dragstart',start,false);
	        arrastable.addEventListener('dragend',end,false);
	        arrastable.addEventListener('click',SeleccionoArrastrable,false);

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

	elementomove.parentNode.removeChild(elementomove);
	e.target.style.border = ''; 
	PuntajeUpdate();
	
}




function GenerarId() {

	var aleatorio = Math.round(Math.random()*2)+1;

	switch(aleatorio) {

	case 1:
		var aleatorio1 = Numaleatorio(1,3);

		var midiv = document.createElement("div");
		midiv.setAttribute("class","cuadradito arrastrable1");
		midiv.style.backgroundImage = "url('img/"+aleatorio1+".png')";
		midiv.setAttribute("draggable","true");		
	    document.getElementById('bolsa').appendChild(midiv);
	    
	    break;

	case 2:
		var aleatorio2 = Numaleatorio(4,6);
		var midiv = document.createElement("div");
		midiv.setAttribute("class","cuadradito arrastrable2");
		midiv.style.backgroundImage = "url('img/"+aleatorio2+".png')";
		midiv.setAttribute("draggable","true");		
	    document.getElementById('bolsa').appendChild(midiv);

	    break;
	    
	default:
		var aleatorio3 = Numaleatorio(7,9);
	    var midiv = document.createElement("div");
		midiv.setAttribute("class","cuadradito arrastrable3");
		midiv.style.backgroundImage = "url('img/"+aleatorio3+".png')";
		midiv.setAttribute("draggable","true");
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
		localStorage['buenas']++;

	}else if(intentos==10){

		document.getElementById("ok").showModal(); 
		localStorage['malas']++;
	}
		
}
		
function closeDialog(){

	puntos=0;
	GenerarId();
	puntaje.innerHTML="Puntaje :  "+puntos;	
	document.getElementById("ok").close();
	location.reload(true);
	
}

function intrucciones() {

	document.getElementById('windowInt').showModal();
}

function WinPuntajes() {


	document.getElementById('puntajesFinales').innerHTML="Partidas Ganadas : "+localStorage['buenas']+"\nPartidas Perdidas : "+localStorage['malas'];
	document.getElementById('windowPuntajes').showModal();
}
function Numaleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
}
function Data() {

	 //Verificamos que el puntaje este inicializado
    if(!localStorage['buenas']){
        localStorage['buenas'] = 0;
        localStorage['malas'] = 0;
    }
}


function SeleccionoArrastrable(e) {

	e.target.style.border = '3px dotted #555';
	elementomove=this;
	var padre = document.createElement('p');
	var clon = this.cloneNode(true);
	padre.appendChild(clon);
	elemSelecciono=clon; 

}
function SeleccionoContenedor(e) {

	e.preventDefault();

	var elemArrastrable = elemSelecciono.className;

	var id = e.target.id; // Elemento sobre el que se arrastra
	
	if ((id == "verde" ) && (elemArrastrable == "cuadradito arrastrable2")){
		bandera=true;
		
		e.target.style.border = '3px dotted #555'; 
		
	}	

	else if ((id == "azul") && (elemArrastrable == "cuadradito arrastrable1")){
		bandera=true;
		
		e.target.style.border = '3px dotted #555'; 
		
	}

	else if ((id == "gris") && (elemArrastrable == "cuadradito arrastrable3")){
		bandera=true;
		
		e.target.style.border = '3px dotted #555'; 
		
	}else{
		bandera=false;
	}


	e.preventDefault();
	var datos = elemSelecciono;
	elementomove.parentNode.removeChild(elementomove);
	e.target.style.border = ''; 
	
	PuntajeUpdate();

	

}