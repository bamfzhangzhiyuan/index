/**
 * Created by asus on 2019/1/4.
 */
window.onload = function () {


  var child = document.querySelector(".contentMain")
  var con = document.querySelector(".content")
  var arrow = document.querySelector(".arrow")
  var sum = 0
  var timr = null

  var liNodes = document.querySelectorAll(".list li")
  var firstLi = liNodes[0].querySelector(".down");
  var firstPoint = document.querySelectorAll(".firstPoint li")
  var firstScreen = document.querySelectorAll(".firstScreen li")
  var firstwrap = document.querySelector(".contentMain>li:nth-child(1) .liMain")
  var teacher = document.querySelector(".teacher")
  var teacherLi = teacher.querySelectorAll("li")
  var navBar = document.querySelector(".nav-bar")
  var navBarli = navBar.querySelectorAll("li")
  var limain = document.querySelectorAll(".liMain")
  var music = document.querySelector(".music")
  var canvs = null
  var timea = null
  var timeb = null
  var newindex = 0
  var lastindex = 0
  var flag = true

  init()

  function init() {
    /*侧边导航*/
    for (var i = 0; i < navBarli.length; i++) {
      navBarli[i].index = i
      navBarli[i].onclick = function () {
        sum = this.index
        contentmove(sum)
      }


    }
    /*主导航按钮*/
    for (var i = 0; i < liNodes.length; i++) {
      liNodes[i].index = i
      var oldLi = firstLi
      liNodes[i].onclick = function () {

        sum = this.index

        contentmove(sum)
      }

    }
    /*初始化*/
    arrow.style.left = liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth / 2 - arrow.offsetWidth / 2 + "px"

    firstLi.style.width = "100%";


    window.onresize = function () {
      arrow.style.left = liNodes[sum].getBoundingClientRect().left + liNodes[sum].offsetWidth / 2 - arrow.offsetWidth / 2 + "px"
      child.style.top = -con.offsetHeight * sum + "px"

    }
    /*小三角移动*/
    function move(newindex) {
      var newLi = liNodes[newindex].querySelector(".down")
      navBarli[lastindex].className = ""
      navBarli[newindex].className = "active"

      oldLi.style.width = ""
      newLi.style.width = "100%"
      oldLi = newLi
      arrow.style.left = liNodes[newindex].getBoundingClientRect().left + liNodes[newindex].offsetWidth / 2 - arrow.offsetWidth / 2 + "px"

      Toggle(newindex, lastindex)
      lastindex = newindex
    }

    /*滚轮事件*/
    document.addEventListener("DOMMouseScroll", wheel)
    document.onmousewheel = wheel

    /*主体移动*/
    function contentmove(sum) {

      child.style.top = -con.offsetHeight * sum + "px"

      move(sum)

    }

    /* contentmove(4)*/
    /*兼容滚轮事件*/
    function wheel(event) {
      clearTimeout(timr)
      timr = setTimeout(function () {
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

            if (sum > 0) {
              sum--
              contentmove(sum)
            }

            break;
          case "down":
            if (sum < 4) {
              sum++
              contentmove(sum)
            }

            break;
        }

      }, 200)

      event.preventDefault && event.preventDefault();

      return false;
    }


  }

  First()
  function First() {

    var oldindex = 0
    var newindex = 0
    var nowtime = 0
    var lasttime = 0
    var timer = null
    for (var i = 0; i < firstPoint.length; i++) {

      firstPoint[i].index = i
      firstPoint[i].onclick = function () {
        newindex = this.index
        nowtime = Date.now()

        if (nowtime - lasttime <= 2000) return

        if (newindex === oldindex) return

        if (newindex > oldindex) {
          firstScreen[newindex].className = "common rightshow"
          firstScreen[oldindex].className = "common lefthide"
        } else {
          firstScreen[newindex].className = "common leftshow"
          firstScreen[oldindex].className = "common righthide"
        }
        firstPoint[newindex].className = "active"
        firstPoint[oldindex].className = ""

        oldindex = newindex
        lasttime = nowtime


      }
    }
    firstwrap.onmouseenter = function () {
      clearInterval(timer)
    }
    firstwrap.onmouseleave = function () {
      auto()
    }
    auto()
    function auto() {
      timer = setInterval(function () {
        newindex++
        lasttime = Date.now()
        if (newindex == 4) {
          newindex = 0
        }
        firstScreen[newindex].className = "common rightshow"
        firstScreen[oldindex].className = "common lefthide"

        firstPoint[newindex].className = "active"
        firstPoint[oldindex].className = ""
        oldindex = newindex
      }, 3000)
    }


  }

  /*第五屏JS*/
  Five()
  function Five() {
    var width = teacherLi[0].offsetWidth
    var height = teacherLi[0].offsetHeight
    for (var i = 0; i < teacherLi.length; i++) {

      teacherLi[i].index = i
      teacherLi[i].onmouseenter = function () {
        for (var j = 0; j < teacherLi.length; j++) {
          teacherLi[j].style.opacity = 0.5
        }
        this.style.opacity=1
        if (!canvs) {
          canvs = document.createElement("canvas")
          /*canvs.style.background="pink"*/
          canvs.width = width
          canvs.height = height
          canvs.style.position = "absolute"
          canvs.style.top = 0
          canvs.style.left = this.index * width + "px"
          teacher.appendChild(canvs)
          bubble(canvs)
          console.log(canvs)
        }
        canvs.style.left = this.index * width + "px"
        function bubble(can) {
          if (can.getContext) {
            var canPanit = can.getContext("2d")
            var width = can.offsetWidth
            var height = can.offsetHeight
            var arr = []
            timea = setInterval(function () {

              var x = Math.floor(Math.random() * width)

              var r = Math.floor(Math.random() * 255)
              var g = Math.floor(Math.random() * 255)
              var b = Math.floor(Math.random() * 255)
              var deg = 0
              var opacity = 1
              var scr = Math.floor(Math.random() * 8 + 2)
              var y = can.offsetHeight + scr
              var s = Math.floor(Math.random() * 50 + 20)
              arr.push({
                x: x,
                y: y,
                r: r,
                g: g,
                b: b,
                deg: deg,
                scr: scr,
                s: s,
                opacity: opacity,
              })

            }, 40)
            timeb = setInterval(function () {
              canPanit.clearRect(0, 0, width, height)
              for (var i = 0; i < arr.length; i++) {
                item = arr[i]
                item.deg += 5
                red = item.deg * Math.PI / 180

                now = Math.floor(item.y - red * item.s)
                last = Math.floor(item.x + Math.sin(red) * item.s)


                if (item.y < 0) {
                  arr.splice(i, 1)
                  continue
                }

                canPanit.fillStyle = 'rgba(' + item.r + ',' + item.g + ',' + item.b + ',' + item.opacity + ')'

                canPanit.beginPath()
                canPanit.arc(last, now, item.scr, 0, Math.PI * 2)

                canPanit.fill()
              }

            }, 1000 / 60)
          }
        }
      }
      teacher.onmouseleave = function () {
        teacher.removeChild(canvs)
        canvs = null
        clearInterval(timea)
        clearInterval(timeb)
        for(var i=0;i<teacherLi.length;i++){
         teacherLi[i].style.opacity=1
         }
      }
    }
  }

  /*音乐播放*/
  Music()
  function Music() {


    music.onclick = function () {
      if (music.lastElementChild.paused) {
        this.lastElementChild.play()
        this.firstElementChild.src = "img/musicoff.gif"

      } else {
        this.lastElementChild.pause()
        this.firstElementChild.src = "img/musicon.gif"

      }

    }
  }

  /*出入场动画*/

  Toggle();

  function Toggle(newindex, lastindex) {
    var height = limain[0].offsetHeight

    var plane = document.querySelectorAll(".plane")
    var pencle = document.querySelectorAll(".pencle")
    var cuttop = document.querySelector(".cutTop")
    var cutbot = document.querySelector(".cutBottom")
    var fivecon = document.querySelector(".fiveCon")
    var fiveh = document.querySelector(".fiveTitle")

    var arr = [
      {
        anin: function () {
          limain[0].style.transform = "translateY(0)";
          limain[0].style.opacity = 1
        },
        anout: function () {
          limain[0].style.transform = "translateY(" + -height + "px)";
          limain[0].style.opacity = 0

        }
      },
      {

        anin: function () {
          plane[0].style.transform = "translateX(0) translateY(0)"
          plane[1].style.transform = "translateX(0) translateY(0)"
          plane[2].style.transform = "translateX(0) translateY(0)"
        },
        anout: function () {
          plane[0].style.transform = "translateX(-200px) translateY(-100px)"
          plane[1].style.transform = "translateX(-200px) translateY(100px)"
          plane[2].style.transform = "translateX(200px) translateY(100px)"
        }
      },
      {

        anin: function () {
          pencle[0].style.transform = "translateX(0) translateY(0)"
          pencle[1].style.transform = "translateX(0) translateY(0)"
          pencle[2].style.transform = "translateX(0) translateY(0)"
        },
        anout: function () {
          pencle[0].style.transform = "translateX(-200px) translateY(-100px)"
          pencle[1].style.transform = "translateX(-200px) translateY(100px)"
          pencle[2].style.transform = "translateX(200px) translateY(100px)"
        }
      },
      {
        anin: function () {
          cuttop.style.transform = "rotate(0)"
          cutbot.style.transform = "rotate(0)"
        },
        anout: function () {
          cuttop.style.transform = "rotate(40deg)"
          cutbot.style.transform = "rotate(-40deg)"
        }
      },
      {
        anin: function () {
          fivecon.style.transform = "translateX(0)"
          fiveh.style.transform = "translateX(0)"
        },
        anout: function () {
          var a = 50
          fivecon.style.transform = "translateX(" + -a + "px)"
          fiveh.style.transform = "translateX(" + a + "px)"
        }
      }

    ]

    if (flag) {
      for (var i = 0; i < arr.length; i++) {

        arr[i].anout()

      }

      flag = false


    } else {


      arr[newindex].anin()
      arr[lastindex].anout()

    }


  }

  /*开机动画*/
  open()
  function open() {
    var arr = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg', 'worksimg1.jpg', 'worksimg2.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'team.png', 'greenLine.png'];
    var maskTop=document.querySelector(".maskTop")
    var maskBottom=document.querySelector(".maskBottom")
    var maskline=document.querySelector(".maskLine")
    var mask=document.querySelector(".mask")
    var num=0
    for (var i = 0; i < arr.length; i++) {
        var image=new Image()
      image.src="img/"+arr[i]
      image.onload=function () {
        num++
        maskline.style.width=num/arr.length*100+"%"
        if (num===arr.length){
          maskTop.style.height=0
          maskBottom.style.height=0
          maskline.style.display="none"
          Toggle(0,1)

          maskTop.addEventListener("transitionend",function () {
            mask.remove()
          })
        }

      }



    }
  }

}