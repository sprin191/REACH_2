myApp.controller('HeaderController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location)
{

$scope.showLogoutBtn = false;

checkLogin();

  //Logs user out.
  $scope.logout = function () {
    $http.get('/hours/logout')
    .then(function (response) {
      if (response.status === 200 ) {
        //console.log(response);
        $scope.showLogoutBtn = false;
        $window.location.href='#/login';
      } else {
        //console.log("logout error");
        return;
      }
    });
  };

  //Checks whether user is logged in, and shows/hides logout button accordingly.
  function checkLogin() {
    $http.get('/hours/checkAuth')
      .then(function (response) {
        //console.log(response);
        if (response.status == 200) {
          if (response.data.passOk === true) {
            $scope.showLogoutBtn = true;
          }
          else {
            $scope.showLogoutBtn = false;
          }
        } else {
          //console.log("check login error");
          return;
        }
      });
  }

}]);
