function sketchProc(p) {
	var Nokta = function(x,y){
		this.x = x;
		this.y = y;
	}
	Nokta.prototype.drawMe = function(r,g,b){
		//p.noStroke();
		p.strokeWeight(0.1)
		p.fill(r,g,b);
		p.ellipse(this.x, this.y,0.5*faktor,0.5*faktor);
	}
	Nokta.prototype.walk = function(hizX, hizY){
		this.x += hizX;
		this.y += -(hizY);
	}
	
	var nokta;
	//Kullanıcıdan istenen değerler
	var hiz;
	var derece;
	//htmlden alınan değerler
	var input_hiz = document.getElementById("ilkHiz");
	var input_derece = document.getElementById("derece");
	var iz;
	//Hesaplanacak olan değerler
	var hizX;
	var ilk_hizX;
	var ilk_hizY;
	var hizY;
	var cikisT;
	var maxX;
	var maxY;
	var faktor;
	//Sabit Değerler
	var g;
	var t;
	var frame;
	var onefour;
	
	var sabitleriCiz = function(){
		p.strokeWeight(2);
		p.line(24,455,1300,455);
		p.line(23,454,23,0);
		p.text("0",15,465);
			
		for(j=5;j<1000/faktor;j=j+5){
			p.text(j,5,(450-(j*faktor))); // y ekseni
		}
			
		for(i= 10;i<1300/faktor;i=i+10)
		{
			p.text(i,(i*faktor)+20,470); // x ekseni
		}
	}
	

	p.setup = function() {
		//Sabit değerler girilir
	    g = 9.8;
		t = 0;
		//Kullanıcadan değerler alınır
		hiz=input_hiz.value;
		derece=(input_derece.value)*Math.PI/180;
		iz=document.getElementById("iz").checked;
		//Hesaplamalar yapılır
		ilk_hizX = Math.cos(derece)*hiz;
		ilk_hizY = Math.sin(derece)*hiz;
		cikisT= (ilk_hizY/g);
		maxX = 	cikisT*2*ilk_hizX ;
		maxY = -( Math.pow(ilk_hizY,2)/(2*g) );
		//faktor = 700/maxX;
		faktor = document.getElementById("faktor").value; // 15 pixel 1 metre
		
		//Sonuçlar Yazılır
		document.getElementById("pCikisT").innerText = "Çıkış Süresi                  : " + cikisT.toFixed(2) +" s";
		document.getElementById("pTopT").innerText = "Uçuş süre                     : " + (cikisT*2).toFixed(2) +" s";
		document.getElementById("pMaxY").innerText = "Maximum yükseklik   : " + (-maxY).toFixed(2) +" m";
		document.getElementById("pMaxX").innerText = "Menzil                         : " + maxX.toFixed(2) +" m";
	
		frame = 15; // Saniyede gösterilen kare sayısı
		
		//Canvasa ayar çekilir
		p.size(1300, 500);
		p.textSize(12);
		p.frameRate(frame); 
		p.fill(255);
		p.stroke(0);
		p.background(255, 255, 255);
		
		//Noktayı oluşturur ve İlk kez çizer
		nokta  = new Nokta(25,455);
		nokta.drawMe(255,0,0);
		sabitleriCiz();
		//Döngü serbest
		p.noLoop();
		p.smooth();
		
	}
	p.draw = function() {
		//X ve Y de Hızı Hesaplar
		hizX = Math.cos(derece)*hiz;
		hizY = (Math.sin(derece)*hiz) - (g*t/faktor);
		// Nokta hareket eder
		nokta.walk(hizX, hizY);
		
		//Zemin ile çarpışmayı kontrol eder
		if(nokta.y > 455) 
		{ 
			p.noLoop(); // Döngü kesilir
			
			p.strokeWeight(0.1)
			p.fill(255,0,0);
			
			//Son çizim
			sabitleriCiz();
		}
		else{

		
		if(!iz){
			p.background(255,255,255);
		}
		
		sabitleriCiz();
		nokta.drawMe(255,0,0);
		t++;
		
		}
	}

}

var canvas = document.getElementById("myCanvas");
var p = new Processing(canvas, sketchProc);