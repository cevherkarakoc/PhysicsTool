function sketchProc(p) {
	var Nokta = function(x,y){
		this.x = x;
		this.y = y;
	}
	Nokta.prototype.drawMe = function(r,g,b){
		//p.noStroke();
		p.strokeWeight(0.1)
		p.fill(r,g,b);
		p.rect(this.x, this.y,3*faktor,3*faktor);
	}
	Nokta.prototype.walk = function(hizX, hizY){
		this.x += hizX;
		this.y += hizY;
	}
	
	var nokta;
	//Kullanıcıdan istenen değerler
	var faktor;
	var yukseklik;
	//htmlden alınan değerler
	var input_yukseklik = document.getElementById("yukseklik");
	var input_faktor = document.getElementById("faktor");
	//Hesaplanacak olan değerler
	var deltaY;
	var cHiz;
	var ucusT;
	//Sabit Değerler
	var g;
	var t;
	var frame;
	
	var sabitleriCiz = function(){
		p.fill(80, 136, 17);
		p.rect(0,600,500,50);
		p.stroke(155);
		p.strokeWeight(2);
		p.line(50,600,50,0);
		for(i=10;i<650;i=i+10)
		{
			p.fill(255,0,0);
			p.text(i,20,605-(i*faktor));
			p.line(50,600-(i*faktor),450,600-(i*faktor));
		}
	}

	p.setup = function() {
		//Sabit değerler girilir
	    g = 9.8;
		t = 0;
		//Kullanıcadan değerler alınır
		yukseklik = input_yukseklik.value;
		faktor = input_faktor.value;
		//Hesaplamalar yapılır
		cHiz = Math.sqrt(2*g*yukseklik);
		ucusT = cHiz/g;
		
		//Sonuçlar Yazılır
		document.getElementById("pT").innerText = "Uçuş Süresi        : " + ucusT.toFixed(2) +" s";
		document.getElementById("pSonHiz").innerText = "Çarpma Hızı       : " + cHiz.toFixed(2) +" m/s";
		
		
		frame = 24; // Saniyede gösterilen kare sayısı
		
		//Canvasa ayar çekilir
		p.size(500, 650);
		p.textSize(12);
		p.frameRate(frame); 
		p.fill(255);
		p.stroke(0);
		p.background(255, 255, 255);
		
		nokta = new Nokta(250,(600-(yukseklik*faktor))-3*faktor);
		nokta.drawMe(255,0,0);
		sabitleriCiz();
		//Döngü serbest
		p.noLoop();
		p.smooth();
		
	}
	p.draw = function() {
		//Hızı Hesaplar
		deltaY =g*t*faktor;
		// Nokta hareket eder
		nokta.walk(0, deltaY);
		
		//Zemin ile çarpışmayı kontrol eder
		if(nokta.y > (600-(2*faktor))) 
		{ 
			p.noLoop(); // Döngü kesilir		
			//Son çizim
			p.background(255,255,255);
			p.rect(nokta.x,(600-(3*faktor)),3*faktor,3*faktor);
			sabitleriCiz();
		}
		else{		
		p.background(255,255,255);
		
		sabitleriCiz();
		nokta.drawMe(255,0,0);
		t=t+0.1;
		
		}
	}

}

var canvas = document.getElementById("myCanvas");
var p = new Processing(canvas, sketchProc);