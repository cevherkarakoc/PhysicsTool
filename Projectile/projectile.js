function sketchProc(p) {
	var Particle = function(x,y){
		this.x = x;
		this.y = y;
	}
	Particle.prototype.drawMe = function(r,g,b){
		//p.noStroke();
		p.strokeWeight(0.1)
		p.fill(r,g,b);
		p.ellipse(this.x, this.y,0.5*factor,0.5*factor);
	}
	Particle.prototype.walk = function(velocityX, velocityY){
		this.x += velocityX;
		this.y += -(velocityY);
	}
	
	var particle;
	//Kullanıcıdan istenen değerler
	var velocity;
	var degree;
	//htmlden alınan değerler
	var input_velocity = document.getElementById("firstVelocity");
	var input_degree = document.getElementById("degree");
	var path;
	//Hesaplanacak olan değerler
	var velocityX;
	var first_velocityX;
	var first_velocityY;
	var velocityY;
	var cT;
	var maxX;
	var maxY;
	var factor;
	//Sabit Değerler
	var g;
	var t;
	var frame;
	
	var drawStatic = function(){
		p.strokeWeight(2);
		p.line(24,455,1300,455);
		p.line(23,454,23,0);
		p.text("0",15,465);
			
		for(j=5;j<1000/factor;j=j+5){
			p.text(j,5,(450-(j*factor))); // y ekseni
		}
			
		for(i= 10;i<1300/factor;i=i+10)
		{
			p.text(i,(i*factor)+20,470); // x ekseni
		}
	}
	

	p.setup = function() {
		//Sabit değerler girilir
	    g = 9.8;
		t = 0;
		//Kullanıcadan değerler alınır
		velocity=input_velocity.value;
		degree=(input_degree.value)*Math.PI/180;
		path=document.getElementById("path").checked;
		//Hesaplamalar yapılır
		first_velocityX = Math.cos(degree)*velocity;
		first_velocityY = Math.sin(degree)*velocity;
		cT= (first_velocityY/g);
		maxX = 	cT*2*first_velocityX ;
		maxY = -( Math.pow(first_velocityY,2)/(2*g) );
		//factor = 700/maxX;
		factor = document.getElementById("factor").value; // 15 pixel 1 metre
		
		//Sonuçlar Yazılır
		document.getElementById("pFlyT").innerText = "Time of flight                 : " + (cT*2).toFixed(2) +" s";
		document.getElementById("pMaxY").innerText = "Maximum Height          : " + (-maxY).toFixed(2) +" m";
		document.getElementById("pMaxX").innerText = "Range                             : " + maxX.toFixed(2) +" m";
	
		frame = 15; // Saniyede gösterilen kare sayısı
		
		//Canvasa ayar çekilir
		p.size(1300, 500);
		p.textSize(12);
		p.frameRate(frame); 
		p.fill(255);
		p.stroke(0);
		p.background(255, 255, 255);
		
		//Noktayı oluşturur ve İlk kez çizer
		particle  = new Particle(25,455);
		particle.drawMe(255,0,0);
		drawStatic();
		//Döngü serbest
		p.noLoop();
		p.smooth();
		
	}
	p.draw = function() {
		//X ve Y de Hızı Hesaplar
		velocityX = Math.cos(degree)*velocity;
		velocityY = (Math.sin(degree)*velocity) - (g*t/factor);
		// Nokta hareket eder
		particle.walk(velocityX, velocityY);
		
		//Zemin ile çarpışmayı kontrol eder
		if(particle.y > 455) 
		{ 
			p.noLoop(); // Döngü kesilir
			
			p.strokeWeight(0.1)
			p.fill(255,0,0);
			
			//Son çizim
			drawStatic();
		}
		else{

		
		if(!path){
			p.background(255,255,255);
		}
		
		drawStatic();
		particle.drawMe(255,0,0);
		t++;
		
		}
	}

}

var canvas = document.getElementById("myCanvas");
var p = new Processing(canvas, sketchProc);