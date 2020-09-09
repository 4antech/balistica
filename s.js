//denis.kudriakov@gmail.com
//20.08.20
////////////////////// global vars
const h=2000;
const d=2000; 
const margin=200;
var  a=0; //in line
var b=150; //from ine
const time=20;
const k=d/(2*Math.sqrt(h));
const r=Math.sqrt(h);    //TODO: check this    <--- 
const r2g=180/Math.PI; //radian to gradus
const pi2= 2 * Math.PI;

var maxy=0;
var x=0.1;
var y=1.0;
var y1=.1;
var y2=.1;
var y3=0;
var yy1=.1;
var yy2=.1;
var yyy1=.1;
var yyy2=.1;
var azsp;
var azus;
var elsp;
var elus;
el = new  Array();
az = new  Array();
var amaxspaz=new Array();
var amaxspel=new Array();
var amaxusaz=new Array();
var amaxusel=new Array();
var deltax=1;
var deltaf1=0.0;
var deltay1=0.0;
var deltay2=0.0;
var deltaaz=0.0;
var deltael=0.0;
var maxspaz=0;
var maxspel=0;
var maxusaz=0;
var maxusel=0;
var cntw=0;
var tmp=0;
var ts=new Date();
var ts1=new Date();
var ts2=new Date();
var st=.1;
var end=2*r*k;
var deltatime=0;
var sumtime=0;

function f(x){
  var X= ((x)/k -  r);
  return (h-(X*X));
}
///////////////////////////////////////////
for (var ia=0; ia<(d+2*margin); ia++){
  ts=new Date();
  a=ia-margin;
  cntw=0;
  for (b=0;b<500;b++) { 
    for (x=st; x<end; x+=deltax ){ ///////////////////////////////////////////////////////
      y=f(x);                     //  ------- mine y1 & y2 - angles az&el in RADIAN
      deltaf1=y-deltaf1;
      if (maxy<y) maxy=y;
      if (b) {
        if (a<0){
          if (x>-a)  y1=Math.atan2(-a-x),b); //az angle
          else y1=Math.atan2(a+x,b);
        }
        else y1=Math.atan2(x+a,b)-Math.atan2(a,b);    //az else
      }
      else y1=0; //azimuth
      y2=Math.atan2(y,Math.sqrt((x+a)*(x+a)+b*b));    //elevation angle
      deltay1=y1-deltay1;
      deltay2=y2-deltay2;                             //delta f on this iteration
/////////////////// ang-speed
      yy1=deltay1/ (time/(d*deltax));                //mine yy1 & yy2 - angle speed
      yy2=deltay2/ (time/(d*deltax));                //
      deltaaz=yy1-deltaaz;                           //delta f on this iteration
      deltael=yy2-deltael;
      if (maxspaz<yy1) maxspaz=yy1;                  //find MAX azim
      if (maxspel<yy2) maxspel=yy2;
//////////// acscelleration
      yyy1=Math.abs(deltaaz/ (time/(d*deltax)));
      yyy2=Math.abs(deltael/ (time/(d*deltax)));
      if (maxusaz<yyy1) maxusaz=yyy1;
      if (maxusel<yyy2) maxusel=yyy2;
      az[cntw]=y2;
      el[cntw]=y3;;
      cntw++;
//       padlina+=Math.sqrt(deltax*deltax+deltaf1*deltaf1);
      deltaf1=y;
      deltay1=y1;
      deltay2=y2;
      deltaaz=yy1;
      deltael=yy2;
    } // end for
//    amaxspaz[[ia][b]]=maxspaz;
//    amaxspel[[ia][b]]=maxspel;
//    amaxusaz[[ia][b]]=maxusaz;
//    amaxusel[[ia][b]]=maxusel;
  }
  ts2=new Date();
  deltatime=(ts2-ts);
  sumtime+=deltatime;
  console.log('a='+a+' b='+b+"time iteration: "+Math.round(deltatime/100)/10+'sec alltime:'+Math.round(sumtime/100)/10+' avgtime: '+Math.round(sumtime/ia/100)/10);
} //for a & b
ts2=new Date();
console.log(ts1);
console.log(ts2);
console.log(ts2-ts1);
