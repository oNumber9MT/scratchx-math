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

  // 最小値
  ext.getMin = function(sep, arr, callback) {
    var array = arr.split(sep);
    var array_out = arraySortAsc(array);
    callback(array_out[0]);
  }

  // 最大値
  ext.getMax = function(sep, arr, callback) {
    var array = arr.split(sep);
    var array_out = arraySortAsc(array);
    callback(array_out[array_out.length - 1]);
  }

  // 中央値
  ext.getMedian = function(sep, arr, callback) {
    var array = arr.split(sep);
    var wk_array = arraySortAsc(array);
    if (wk_array.length % 2 == 0) {
      var num = Math.floor(wk_array.length / 2);
      var ave = (Number(wk_array[num - 1]) + Number(wk_array[num])) / 2;
      callback(ave);
    } else {
      var num = Math.round(wk_array.length / 2);
      callback(wk_array[num - 1]);
    }
  }

  // ソート（昇順）
  ext.sortAsc = function(sep, arr, callback) {
    var array = arr.split(sep);
    var array_out = arraySortAsc(array);
    callback(array_out);
  }

  // ソート（降順）
  ext.sortDesc = function(sep, arr, callback) {
    var array = arr.split(sep);
    var array_out = arraySortDesc(array);
    callback(array_out);
  }

  // 配列ソート関数（昇順）
  function arraySortAsc(arr) {
    arr.sort(function(a, b) {
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    });
    return arr; 
  }

  // 配列ソート関数（降順）
  function arraySortDesc(arr) {
    arr.sort(function(a, b) {
      if(a > b) return -1;
      if(a < b) return 1;
      return 0;
    });
    return arr; 
  }

  var descriptor = {
    blocks: [
      ['R', 'π', 'getPI'],
      ['R', '%n の立方根', 'getCbrt', 8],
      ['R', '%n の %n 乗', 'getPow', 2, 3],
      ['R', '%s 区切りの数値データ %s の合計', 'getSum', ','],
      ['R', '%s 区切りの数値データ %s の平均', 'getAve', ','],
      ['R', '%s 区切りの数値データ %s の最小値', 'getMin', ','],
      ['R', '%s 区切りの数値データ %s の最大値', 'getMax', ','],
      ['R', '%s 区切りの数値データ %s の中央値', 'getMedian', ','],
      ['R', '%s 区切りのデータ %s を昇順でソートしたもの', 'sortAsc', ','],
      ['R', '%s 区切りのデータ %s を降順でソートしたもの', 'sortDesc', ','],
    ]
  };

  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('Math Extension', descriptor, ext);
})({});