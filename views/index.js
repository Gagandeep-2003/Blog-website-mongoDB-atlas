var cursor = document.querySelector("#cursor");
var main = document.querySelector("#main");

main.addEventListener("mousemove", (dets)=>{        //dets define the mouse events like xaxis or y axis etc
    // console.log(dets.x)
    cursor.style.left = dets.x+ "px";
    cursor.style.top = dets.y+ "px";
});
