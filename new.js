/**
 * Created by asus on 2019/1/4.
 */
window.onload=function () {


    var child=document.querySelector(".contentMain")
    var con=document.querySelector(".content")
    var arrow=document.querySelector(".arrow")
    var sum=0
    var timr=null

    var liNodes=document.querySelectorAll(".list li")
    var firstLi=liNodes[0].querySelector(".down");
    var firstPoint=document.querySelectorAll(".firstPoint li")
    var firstScreen=document.querySelectorAll(".firstScreen li")
    var firstwrap=document.querySelector(".contentMain>li:nth-child(1) .liMain")
    var teacher=document.querySelector(".teacher")
    var teacherLi=teacher.querySelectorAll("li")
    var canvs=null
    var timea=null
    var timeb=null

   init()

   function init() {


       for (var i = 0; i <liNodes.length; i++) {
           liNodes[i].index=i
           var oldLi=firstLi
           liNodes[i].onclick=function () {

               sum=this.index

               contentmove(sum)
           }

       }
       arrow.style.left=liNodes[0].getBoundingClientRect().left+liNodes[0].offsetWidth/2-arrow.offsetWidth/2+"px"

       firstLi.style.width="100%";




       window.onresize=function () {
           arrow.style.left=liNodes[sum].getBoundingClientRect().left+liNodes[sum].offsetWidth/2-arrow.offsetWidth/2+"px"
           child.style.top=-con.offsetHeight*sum+"px"

       }
       /*小三角移动*/
       function move(newindex) {
           var newLi=liNodes[newindex].querySelector(".down")


           oldLi.style.width=""
           newLi.style.width="100%"
           oldLi=newLi
           arrow.style.left=liNodes[newindex].getBoundingClientRect().left+liNodes[newindex].offsetWidth/2-arrow.offsetWidth/2+"px"
       }

       /*滚轮事件*/
       document.addEventListener("DOMMouseScroll",wheel)
       document.onmousewheel=wheel

       /*主体移动*/
       function contentmove(sum) {

           child.style.top=-con.offsetHeight*sum+"px"
           move(sum)
       }
     /*  contentmove(4)*/
       /*兼容滚轮事件*/
       function wheel(event) {
           clearTimeout(timr)
           timr=setTimeout(function () {
               event = event || window.event;

               var flag = '';
               if (event.wheelDelta) {
                   //ie/chrome
                   if (event.wheelDelta > 0) {
                       flag = 'up';
                   } else {
                       flag = 'down'
                   }
               } else if (event.detail) {
                   //firefox
                   if (event.detail < 0) {
                       flag = 'up';
                   } else {
                       flag = 'down'
                   }
               }
               switch (flag) {
                   case 'up' :

                       if(sum>0){
                           sum--
                           contentmove(sum)
                       }

                       break;
                   case "down":
                       if (sum<4){
                           sum++
                           contentmove(sum)
                       }

                       break;
               }
               console.log(sum)
           },200)

           event.preventDefault && event.preventDefault();

           return false;
       }


   }

   First()
   function First() {

        var oldindex=0
        var newindex=0
        var nowtime=0
        var lasttime=0
        var timer=null
       for (var i = 0; i <firstPoint.length; i++) {

           firstPoint[i].index=i
           firstPoint[i].onclick=function () {
               newindex=this.index
               nowtime=Date.now()

               if(nowtime-lasttime<=2000) return

               if (newindex===oldindex) return

               if (newindex>oldindex){
                   firstScreen[newindex].className="common rightshow"
                   firstScreen[oldindex].className="common lefthide"
               }else {
                   firstScreen[newindex].className="common leftshow"
                   firstScreen[oldindex].className="common righthide"
               }
               firstPoint[newindex].className="active"
               firstPoint[oldindex].className=""

              oldindex=newindex
               lasttime=nowtime


           }
       }
       firstwrap.onmouseenter=function () {
          clearInterval(timer)
       }
       firstwrap.onmouseleave=function () {
           auto()
       }
       auto()
       function auto() {
           timer=setInterval(function () {
               newindex++
               lasttime=Date.now()
               if(newindex==4){
                   newindex=0
               }
               firstScreen[newindex].className="common rightshow"
               firstScreen[oldindex].className="common lefthide"

               firstPoint[newindex].className="active"
               firstPoint[oldindex].className=""
               oldindex=newindex
           },3000)
       }


   }

   /*第五屏JS*/
   Five()
   function  Five() {
     var width=teacherLi[0].offsetWidth
     var height=teacherLi[0].offsetHeight
     for (var i = 0; i < teacherLi.length; i++) {

         teacherLi[i].index=i
         teacherLi[i].onmouseenter=function () {
           if(!canvs){
               canvs=document.createElement("canvas")
               /*canvs.style.background="pink"*/
               canvs.width=width
               canvs.height=height
               canvs.style.position="absolute"
               canvs.style.top=0
               canvs.style.left=this.index*width+"px"
               teacher.appendChild(canvs)
               bubble(canvs)
             console.log(canvs)
           }
           canvs.style.left=this.index*width+"px"
           function bubble(can) {
             if (can.getContext) {
               var canPanit=can.getContext("2d")
               var width=can.offsetWidth
               var height=can.offsetHeight
               var arr=[]
               timea=setInterval(function () {

                 var x=Math.floor(Math.random()*width)

                 var r=Math.floor(Math.random()*255)
                 var g=Math.floor(Math.random()*255)
                 var b=Math.floor(Math.random()*255)
                 var deg=0
                 var opacity=1
                 var scr=Math.floor(Math.random()*8+2)
                 var y=can.offsetHeight+scr
                 var s=Math.floor(Math.random()*50+10)
                 arr.push({
                   x:x,
                   y:y,
                   r:r,
                   g:g,
                   b:b,
                   deg:deg,
                   scr:scr,
                   s:s,
                   opacity:opacity,
                 })

               }, 50)
               timeb=setInterval(function () {
                 canPanit.clearRect(0,0,width,height)
                 for (var i=0;i<arr.length;i++){
                   item=arr[i]
                   item.deg+=5
                   red=item.deg*Math.PI/180

                   now=Math.floor(item.y-red*item.s)
                   last=Math.floor(item.x+Math.sin(red)*item.s)



                   if (item.y<0){
                     arr.splice(i,1)
                     continue
                   }

                   canPanit.fillStyle='rgba('+item.r+','+item.g+','+item.b+','+item.opacity+')'

                   canPanit.beginPath()
                   canPanit.arc(last,now,item.scr,0,Math.PI*2)

                   canPanit.fill()
                 }

               },1000/60)
             }
           }
         }
         teacher.onmouseleave=function () {
           teacher.removeChild(canvs)
           canvs=null
           clearInterval(timea)
           clearInterval(timeb)

         }
     }
   }


}