angular.module('app.filters.Filters', [])
  .filter('userTypeName', function () {
    return function (str) {
      return str == '1' ? 'ผู้ดูแลระบบ' : 'เจ้าหน้าที่บันทึกข้อมูล';
    }
  });