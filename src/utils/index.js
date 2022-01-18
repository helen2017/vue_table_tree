// 小数点失精相加
export function addNum() {
    let args = arguments // 获取所有的参数
    // console.log(args);
    let d = 0 // 定义小数位的初始长度，默认为整数，即小数位为0
    let sum = 0 // 定义sum来接收所有数据的和
    // 循环所有的参数
    for (let key in args) { // 遍历所有的参数
      // 把数字转为字符串
      var str = '' + args[key]
      if (str.indexOf('.') !== -1) { // 判断数字是否为小数
        // 获取小数位的长度
        var temp = str.split('.')[1].length
        // 比较此数的小数位与原小数位的长度，取小数位较长的存储到d中
        d = d < temp ? temp : d
      }
    }
    // 计算需要乘的数值
    var m = Math.pow(10, d)
    // 遍历所有参数并相加
    for (var key in args) {
      sum += accMul(args[key], m)
    }
    // 返回结果
    return sum / m
  }
  //小数点相乘
export function accMul(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) {}
    try { m += s2.split(".")[1].length } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  }