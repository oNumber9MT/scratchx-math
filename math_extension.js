(function(ext) {

  ext._shutdown = function() {};

  ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };

  // ====================================
  // コマンド定義
  // ====================================
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

  // 最頻値
  ext.getMode = function(sep, arr, callback) {
    var array = arr.split(sep);
    // 要素毎の登場回数をカウント
    var cArray = {};
    for (var i = 0; i < array.length; i++) {
      if (cArray[array[i]]) {
        cArray[array[i]]++;
      } else {
        cArray[array[i]] = 1;
      }
    }

    // 最大回数を検出
    var max = 0;
    Object.keys(cArray).forEach(function(key) {
      var val = this[key];
      if (val > max) {
        max = val;
      }
    }, cArray);

    // 最大回数と同いカウント数の要素を検出
    var result = "";
    Object.keys(cArray).forEach(function(key) {
      var val = this[key];
      if (val == max) {
        if (result == "") {
          result = key;
        } else {
          result = result + ',' + key;
        }
      }
    }, cArray);

    callback(result);
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

  // 最大公約数
  ext.getGreatestCommon = function(sep, arr, callback) {
    var array = arr.split(sep);
    var divisorArray = [];
    var flg_finish = 0;
    while (flg_finish == 0) { // 共通で割れる数字がなくなるまで繰り返し
      var flg_found_divisor = 0; // divisorが見つかれば1
      array = arraySortAsc(array);
      for (var divisor = 2; divisor < array[0] + 1; divisor++) { // 割れる数を探す。2から割る数の最小値までの間で検索
        var flg_all_divided = 1; // 配列の数がすべてdivisorで割り切れるなら1、ひとつでも割り切れなければ0に
        for(var i = 0; i < array.length; i++) {
          if (array[i] % divisor != 0) {
            flg_all_divided = 0;
          }
        }
        if (flg_all_divided == 1) {
          flg_found_divisor = 1;
          break; // 配列の全ての数で割り切れたので、divisorが決定
        }
      }

      // divisorが見つかれば、divisorの履歴配列に追加。元の数値配列をそれぞれ割る
      if (flg_found_divisor == 1) {
        divisorArray.push(divisor);
        for(var i = 0; i < array.length; i++) {
          var tmp = array[i] / divisor;
          array[i] = tmp;
        }
      } else {
        flg_finish = 1;
      }
    }

    // divisorの履歴を全て積算
    var result = 1;
    for (var i = 0; i < divisorArray.length; i++) {
      result = result * divisorArray[i];
    }
    callback(result);
  }

  // 最小公倍数
  ext.getLeastCommon = function(sep, arr, callback) {
    var array = arr.split(sep);
    var divisorArray = [];
    var flg_finish = 0;
    while (flg_finish == 0) { // 共通で割れる数字がなくなるまで繰り返し
      var flg_found_divisor = 0; // divisorが見つかれば1
      array = arraySortDesc(array);
      for (var divisor = 2; divisor < array[0] + 1; divisor++) { // 割れる数を探す。2から割る数の最小値までの間で検索
        var flg_divided_num = 0; // 配列の数のうち、divisorで割り切れる数値の数
        for(var i = 0; i < array.length; i++) {
          if (array[i] % divisor == 0) {
            flg_divided_num++;
          }
        }
        if (flg_divided_num > 1) {
          flg_found_divisor = 1;
          break; // 配列の2つ以上数で割り切れたので、divisorが決定
        }
      }

      // divisorが見つかれば、divisorの履歴配列に追加。元の数値配列をそれぞれ割る
      if (flg_found_divisor == 1) {
        divisorArray.push(divisor);
        for(var i = 0; i < array.length; i++) {
          if(array[i] % divisor == 0) {
            var tmp = array[i] / divisor;
            array[i] = tmp;
          }
        }
      } else {
        flg_finish = 1;
      }
    }

    // divisorの履歴を全て積算
    var result = 1;
    for (var i = 0; i < divisorArray.length; i++) {
      result = result * divisorArray[i];
    }
    // 最小公倍数を求める場合は、数値配列の余りも積算
    for(var i = 0; i < array.length; i++) {
      result = result * array[i];
    }
    callback(result);
  }

  // ====================================
  // 共通処理
  // ====================================
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

  // ====================================
  // ブロック定義
  // ====================================
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
      ['R', '%s 区切りのデータ %s の最頻値', 'getMode', ','],
      ['R', '%s 区切りの数値データ %s の最大公約数', 'getGreatestCommon', ','],
      ['R', '%s 区切りの数値データ %s の最小公倍数', 'getLeastCommon', ','],
      ['R', '%s 区切りのデータ %s を昇順でソートしたもの', 'sortAsc', ','],
      ['R', '%s 区切りのデータ %s を降順でソートしたもの', 'sortDesc', ','],
    ]
  };

  // Scratch に作ったブロックを登録します
  ScratchExtensions.register('Math Extension', descriptor, ext);
})({});