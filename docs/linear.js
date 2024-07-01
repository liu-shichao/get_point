function drawImage(name) {
    let canvas = document.getElementById('plot')
    let ctx = canvas.getContext('2d')
    let image = new Image()
    image.src = name
    image.onload = function () {
        let wid = image.width
        let hei = image.height
        canvas.width = wid
        canvas.height = hei
        ctx.drawImage(image, 0, 0, wid, hei)
        // 监听点击事件
        canvas.addEventListener("click", function (event) {
            getMousePos(canvas, event);
        });
    }
}
var state = 0;
var res = "";
var org_x = 0;
var org_y = 0;
var org_pos_x = 0;
var org_pos_y = 0;
var first_x_x = 0;
var first_y_y = 0;
var first_x_pos_x = 0;
var first_y_pos_y = 0;
function calcPos(cx, cy) {
    var ratio_x =  first_x_x - org_x
    var nx = (cx - org_pos_x) * (ratio_x / (first_x_pos_x - org_pos_x)) + org_x;
    
    var ratio_y = first_y_y - org_y
    var ny = (cy - org_pos_y) * (ratio_y / (first_y_pos_y - org_pos_y)) + org_y;
    res += "x: " + nx + ", y: " + ny + "\n";
}
function getMousePos(canvas, event) {
    let ctx = canvas.getContext('2d')
    const drawCircle = (ctx, cx, cy, r) => {
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, 2 * Math.PI)
        if (state == 0) {
            ctx.fillStyle = "red";//填充颜色,默认是黑色
            org_pos_x = cx;
            org_pos_y = cy;
            document.getElementById("origin-pos").textContent = "origin-pos: x:" + cx + " y: " + cy;
            state = 1;
        }
        else if (state == 1) {
            ctx.fillStyle = "red";
            first_x_pos_x = cx;
            document.getElementById("first-x-pos").textContent = "first-x-pos: x:" + cx + " y: " + cy;
            state = 2;
        }
        else if (state == 2) {
            ctx.fillStyle = "red";
            first_y_pos_y = cy;
            document.getElementById("first-y-pos").textContent = "first-y-pos: x:" + cx + " y: " + cy;
            state = 3;
        }
        else if (state == 3) {
            ctx.fillStyle = "blue";
            calcPos(cx, cy);
            document.getElementById("result-points").innerText = res;
        }
        ctx.fill();//画实心圆        
        ctx.closePath()
        ctx.restore()
    }
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left * (canvas.width / rect.width);
    var y = event.clientY - rect.top * (canvas.height / rect.height);
    // 画一个中心点在（100，100），半径20的圆
    drawCircle(ctx, x, y, 10);

}
$(function () {
    console.log(localStorage.getItem('org-x'))
    org_x = document.getElementById("org-x").value = localStorage.getItem('org_x')
    org_y = document.getElementById("org-y").value = localStorage.getItem('org_y')
    first_x_x = document.getElementById("first-x").value = localStorage.getItem('first_x_x')
    first_y_y = document.getElementById("first-y").value = localStorage.getItem('first_y_y')
    $("#fileImport").click(function () {
        $("#files").click();
    })
    $('#org-x').change(function(){
        org_x = document.getElementById("org-x").value;
        localStorage.setItem('org_x',org_x);
    })
    $('#org-y').change(function(){
        org_y = document.getElementById("org-y").value;
        localStorage.setItem('org_y',org_y);
    })
    $('#first-x').change(function(){
        first_x_x = document.getElementById("first-x").value;
        localStorage.setItem('first_x_x',first_x_x);
    })
    $('#first-y').change(function(){
        first_y_y = document.getElementById("first-y").value;
        localStorage.setItem('first_y_y',first_y_y);
    })
});
function fileImport() {
    //获取读取我文件的File对象
    var selectedFile = document.getElementById('files').files[0];

    var name = selectedFile.name;//读取选中文件的文件名
    var size = selectedFile.size;//读取选中文件的大小
    /// read file content.
    var reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = function () {
        drawImage(this.result);
    }


}
