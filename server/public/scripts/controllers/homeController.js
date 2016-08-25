myApp.controller('HomeController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window)
{

$scope.myHours = null;

checkLogin();

//Checks whether user is logged in, and, if so, retrieves the user's hours.
function checkLogin() {
  $http.get('/hours/checkAuth')
    .then(function (response) {
      //console.log(response);
      if (response.status == 200) {
        if (response.data.passOk !== true) {
          $window.location.href='#/login';
        }
        else {
          retrieveHours();
        }
      } else {
        //console.log("check login error");
        return;
      }
    });
}

//Retrieves a user's hours.
function retrieveHours() {
  $http.get('/hours/userData')
    .then(function (response) {
      if (response.status == 200) {
        //console.log(response);
        $scope.myHours = response.data;
        //console.log($scope.myHours);
      } else {
        //console.log(response);
        //console.log("hours retrieval error");
        return;
      }
    });
}

//Updates a user's hours.
$scope.updateHours = function (hours) {
  //console.log ($scope.myHours);
  if ($scope.myHours.sunday + $scope.myHours.monday + $scope.myHours.tuesday + $scope.myHours.wednesday + $scope.myHours.thursday + $scope.myHours.friday + $scope.myHours.saturday <= 40) {
    if ($scope.myHours.sunday <= 10 && $scope.myHours.monday <= 10 && $scope.myHours.tuesday <= 10 && $scope.myHours.wednesday <= 10 && $scope.myHours.thursday <= 10 && $scope.myHours.friday <= 10 && $scope.myHours.saturday <= 10) {
      if ($scope.myHours.sunday > 0 && $scope.myHours.saturday > 0 && $scope.myHours.monday > 0) {
        alert ("If you worked on Saturday and Sunday, you cannot work on Monday. Please try again.");
        retrieveHours();
      } else {
        $http.post('/hours/updateHours', hours)
        .then(function (response) {
          if (response.status == 200) {
            //console.log(response);
            $scope.myHours = response.data;
            alert("Hours successfully saved!");
            //console.log($scope.myHours);
          } else {
            //console.log(response);
            //console.log("hours retrieval error");
            return;
          }
        });
      }
    } else {
      alert ("Daily hours cannot exceed 10 per day. Please try again.");
      retrieveHours();
    }
    } else {
      alert ("Employee hours cannot exceed 40 per week. Please try again.");
      retrieveHours();
    }
  };

}]);
