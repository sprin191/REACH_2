myApp.controller('HomeController', ['$scope', '$http', '$location', '$window', '$sce', function($scope, $http, $location, $window, $sce)
{

$scope.myHours = null;
/*$scope.video = {};
$scope.allVideos = [];
$scope.show1 = true;
$scope.show2 = false;
$scope.show3 = false;

var email = undefined;*/

checkLogin();

//Checks whether user is logged in.
function checkLogin() {
  $http.get('/hours/checkAuth')
    .then(function (response) {
      console.log(response);
      if (response.status == 200) {
        if (response.data.passOk !== true) {
          $window.location.href='#/login';
        }
        else {
          retrieveHours();
        }
      } else {
        console.log("check login error");
        return;
      }
    });
}

function retrieveHours() {
  $http.get('/hours/userData')
    .then(function (response) {
      if (response.status == 200) {
        console.log(response);
        $scope.myHours = response.data;
        console.log($scope.myHours);
      } else {
        console.log(response);
        console.log("video retrieval error");
        return;
      }
    });
}

$scope.updateHours = function (hours) {
  $http.post('/hours/updateHours', hours)
    .then(function (response) {
      if (response.status == 200) {
        console.log(response);
        $scope.myHours = response.data;
        console.log($scope.myHours);
      } else {
        console.log(response);
        console.log("video retrieval error");
        return;
      }
    });
};

}]);
