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

}