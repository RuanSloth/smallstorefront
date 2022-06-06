export function toBase64() {
  return new Promise(function (resolve, reject) {
    let file = document.querySelector('input[type=file]').files[0];
    //没有返回值，但是读取完毕后，将读取结果存储在对象的result中
    let reader = new FileReader();
    //读取完文件触发
    reader.onloadend = function () {
      console.log(reader.result)
      resolve(reader.result)
      //这里调用了向后台发请求的代码
    }
    if (file) {
      // 将读取到的文件编码成DataURL
      reader.readAsDataURL(file);
    }else {

    }
})
}

