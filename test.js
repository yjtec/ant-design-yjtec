var path = require('path');

var s ="/Users/kidkang/.umi/blocks/github.com/yjtec/yjtec/pro-blocks/Exception403";
var c = s.split(path.sep).pop();

var b = '/Volumes/work/yj/yjtec/ant-design-yjtec/src/pages/b/Exception403/locales';
console.log(b.replace(new RegExp(c+"/","g"),""));