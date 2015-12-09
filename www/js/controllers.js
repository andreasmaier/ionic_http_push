angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
    console.log('In Dash Controller');

    var req = {
      method: 'POST',
      url: 'http://httpbin.org/post',
      data: {
        username: 'fooobar',
        password: 'lepass'
      }
    };

    $scope.results = [];

    $http(req)
      .then(function (response) {
        console.log('got response', response);
        if(Object.keys(response.data.data).length === 0) {
          $scope.results.push("1: According to pastebin body was empty");
        } else {
          $scope.results.push("1: data:" + JSON.stringify(response.data.data));
        }

        $http(req)
          .then(function (response2) {
            if(Object.keys(response2.data.data).length === 0) {
              $scope.results.push("2: According to pastebin body was empty");
            } else {
              $scope.results.push("2: data:" + JSON.stringify(response2.data.data));
            }
          })
          .catch(function (error) {
            $scope.results.push(JSON.stringify(error));
            console.log('error doing request 2', error);
          });
      })
      .catch(function (error2) {
        $scope.results.push('2' + JSON.stringify(error2));
        console.log('error doing request', error2);
      });
  })
.controller('ChatsCtrl', function($scope, Chats, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
