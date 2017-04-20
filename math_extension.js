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

  var descriptor = {
    blocks: [
      ['R', 'π', 'getPI'],
      ['R', '%n の立方根', 'getCbrt', 8],
      ['R', '%n の %n 乗', 'getPow', 2, 3],
    ]
  };

  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('Math Extension', descriptor, ext);
})({});