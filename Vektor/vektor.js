function sketchProc(p) {
	var Vektor = function(x,y){
		this.x = x;
		this.y = y;
	}
	Vektor.prototype.drawMe = function(r){
		//p.noStroke();
		p.strokeWeight(5);
		p.stroke(r);
		p.fill(0);
		p.line(p.width/2,p.height/2,this.x,this.y);
	}
	Vektor.prototype.move = function(x,y){
		this.x = x;
		this.y = y;
	}

	var vektorA;
	var vektorB;
	var vektorT;
	var tX;
	var tY;
	var frame;
	var sira;
	
	sabitleriCiz = function(){
		p.stroke(55);
		p.strokeWeight(3);
		p.line(p.width/2,15,p.width/2,p.height-15);//Y eksesni
		p.line(15,p.height/2,p.width-15,p.height/2);//X eksesni
	}
	
	p.setup = function() {	
		
		frame = 24; // Saniyede gösterilen kare sayýsý
		sira = "A";
		
		vektorA = new Vektor(325,175);
		vektorB = new Vektor(175,325);
		
		tX = 325 + (vektorA.x - 325) + (vektorB.x-325);
		tY = 325 + (vektorA.y-325)+(vektorB.y-325);
		
		vektorT = new Vektor(tX,tY);
		//Canvasa ayar çekilir
		p.size(650, 650);
		
		p.smooth();
		
		
	}
	p.draw = function() {
	
		p.background(100, 100, 150);
		sabitleriCiz();
		vektorA.drawMe(0);
		vektorB.drawMe(255);
		vektorT.drawMe(155);
		
	}
	
	p.mouseDragged = function() {
	
		if(sira === "A"){
		if(p.mouseX<vektorA.x+65 && p.mouseX>vektorA.x-65 && p.mouseY<vektorA.y+65 && p.mouseY>vektorA.y-65){
			vektorA.move(p.mouseX,p.mouseY);
			sira = "A";
		}else if(p.mouseX<vektorB.x+65 && p.mouseX>vektorB.x-65 && p.mouseY<vektorB.y+65 && p.mouseY>vektorB.y-65){
			vektorB.move(p.mouseX,p.mouseY);
			sira = "B";
		}
		
		}else{
		if(p.mouseX<vektorB.x+65 && p.mouseX>vektorB.x-65 && p.mouseY<vektorB.y+65 && p.mouseY>vektorB.y-65){
			vektorB.move(p.mouseX,p.mouseY);
			sira="B";;
		}else if(p.mouseX<vektorA.x+65 && p.mouseX>vektorA.x-65 && p.mouseY<vektorA.y+65 && p.mouseY>vektorA.y-65){
			vektorA.move(p.mouseX,p.mouseY);
			sira="A";
		}
		
		}
		tX = 325 + (vektorA.x - 325) + (vektorB.x-325);
		tY = 325 + (vektorA.y-325)+(vektorB.y-325);
		vektorT.move(tX,tY);
	}

}

var canvas = document.getElementById("myCanvas");
var p = new Processing(canvas, sketchProc);