/**
 * Created by Tyler on 2017/11/7 16:50.
 */
$scope.getYZImg = function() { //验证码

    var rand = Math.random();
    $scope.GenTokenImg = "/portal/GenTokenImg.do?rand=" + rand;
    //$("#yzmImg").attr("src",$scope.GenTokenImg);
};

<div id="yzm" v-show="VerCodeFlag==1">
    <span>附加码</span>
    <input type="text" class="text03" name="yzm" maxlength="4" v-model="yzm" style="width:45%;" />
    < img v-src="{{GenTokenImg}}" v-click="getYZImg()" style="width:18%;" />
</div>