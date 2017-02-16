angular.module('app.controllers', [])
.controller('IoTSmartLightingCtrl', function($scope) {

  // const APPID     = <APPID>;
  // const APPKEY    = <APPKEY>;
  // const APPSECRET = <APPSECRET>;

  var microgear = Microgear.create({
      key: APPKEY,
      secret: APPSECRET,
      alias : "Sonoff01HTML5"         /*  optional  */
  });

  microgear.on('message',function(topic,msg) {
    console.log("Micogear subscribed.");
    console.log(topic + " : " + msg);
    console.log("switchState1 : " + $scope.switchState1);
    if (msg === "1") {
      $scope.$apply(function() {
        $scope.switchState1 = true;
        $scope.imageUrl = "img/on.png";
      });
    } else {
      $scope.$apply(function() {
        $scope.switchState1 = false;
        $scope.imageUrl = "img/off.png";
      });
    }
    console.log("switchState1 : " + $scope.switchState1);
  });

  microgear.on('connected', function() {
      microgear.setAlias('Sonoff01HTML5');    /* alias can be renamed anytime with this function */
      microgear.subscribe("/Sonoff01/state");
      console.log("Micogear connected.");
  });

  microgear.on("closed", function() {
    console.log("closed");
  });

  microgear.on("error", function(err) {
    console.log("Error: "+err);
  });

  microgear.on('present', function(event) {
      // console.log("New friend found: "+event.gearkey);
  });

  microgear.on('absent', function(event) {
    // console.log("Friend lost: "+event.gearkey);
  });

  microgear.connect(APPID);
 
  $scope.switchChange1 = function(switchState) {
    console.log('switchState1 : ' + switchState);
    if (switchState == true) {
      microgear.chat("Sonoff01","1");
    } else {
      microgear.chat("Sonoff01","0");
    }
  };

  $scope.switchToggle1 = function() {
    if ($scope.switchState1) {
      microgear.chat("Sonoff01","0");
    } else {
      microgear.chat("Sonoff01","1");
    }
  };

})
 