/**
 * Created by asus on 2019/1/4.
 */
window.onload=function () {


    var arrow=document.querySelector(".arrow")


    var liNodes=document.querySelectorAll(".list li")
    var firstLi=liNodes[0].querySelector(".down")
    arrow.style.left=liNodes[0].getBoundingClientRect().left+liNodes[0].offsetWidth/2-arrow.offsetWidth/2+"px"

    firstLi.style.width="100%"

    for (var i = 0; i <liNodes.length; i++) {
            liNodes[i].index=i
        var oldLi=firstLi
        liNodes[i].onclick=function () {
            var newLi=liNodes[this.index].querySelector(".down")


            oldLi.style.width=""
            newLi.style.width="100%"
            oldLi=newLi
            arrow.style.left=liNodes[this.index].getBoundingClientRect().left+liNodes[this.index].offsetWidth/2-arrow.offsetWidth/2+"px"
            console.log(this.index)
        }

    }


}