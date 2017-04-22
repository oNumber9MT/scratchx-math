(function(ext) {

  ext._shutdown = function() {};

  ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };

  // 円周率
  ext.getPI = function(callback) {
    callback(Math.PI);
  };

  // 立方根
  ext.getCbrt = function(num, callback) {
    callback(Math.cbrt(num));
  };

  // 累乗
  ext.getPow = function(x, y, callback) {
    callback(Math.pow(x, y));
  };

  // 合計
  ext.getSum = function(sep, arr, callback) {
    var array = arr.split(sep);
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
      sum = sum + Number(array[i]);
    }
    callback(sum);
  };

  // 平均
  ext.getAve = function(sep, arr, callback) {
    var array = arr.split(sep);
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
      sum = sum + Number(array[i]);
    }
    callback(sum/array.length);
  };

  var descriptor = {
    blocks: [
      ['R', 'π', 'getPI'],
      ['R', '%n の立方根', 'getCbrt', 8],
      ['R', '%n の %n 乗', 'getPow', 2, 3],
      ['R', '%s 区切りの数値データ %s の合計', 'getSum', ','],
      ['R', '%s 区切りの数値データ %s の平均', 'getAve', ','],
    ]
  };

  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('Math Extension', descriptor, ext);
})({});