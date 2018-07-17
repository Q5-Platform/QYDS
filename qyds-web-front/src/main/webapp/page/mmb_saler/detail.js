/**
 * Created by ZLH on 16/12/16.
 */

var memberId = sessionStorage.getItem("memberId");

$(document).ready(function () {

    $("#mmbMasterDetailArea").modal('show');

    if (memberId && memberId.length > 0) {
        getDetail();
    }
});

function oDownLoad(url,id) {
    if (myBrowser()==="IE" || myBrowser()==="Edge"){
        var oPop = window.open(url,"","width=1, height=1, top=5000, left=5000");
        for(; oPop.document.readyState != "complete"; )
        {
            if (oPop.document.readyState == "complete")break;
        }
        oPop.document.execCommand("SaveAs");
        oPop.close();
    }else{
        //!IE
        var odownLoad=document.getElementById(id);
        odownLoad.href=url;
        odownLoad.download="";
    }
}

function getDetail() {
    var url = "/mmb_saler/detail.json";
    var param = {
        memberId: memberId
    };
    var successCallback = function (data) {
        if (data.resultCode == '00') {
            $("#member_name").val(data.data.memberName);
            $("#sex").val(data.data.sexName);

            $("#telephone").val(data.data.telephone);
            // $("#oldphone").val(data.data.oldphone);
            if (data.data.birthdate) {
                $("#birthdate").val(new Date(data.data.birthdate).Format("yyyy-MM-dd"));
            }

            $("#email").val(data.data.email);

            $("#profession").val(data.data.profession);
            $("#income").val(data.data.income);
            $("#postCode").val(data.data.postCode);
            $("#address").val(data.data.address);

            $("#provinceName").val(data.data.provinceName);
            $("#cityName").val(data.data.cityName);
            $("#districtName").val(data.data.districtName);
            $("#qr_image").attr("src", displayUri + orignal +data.data.qrCodeUrl);
            $("#deleted").val(data.data.deleted=="1"?"已删除":"未删除");
            $("#downloadQR").attr("onclick",oDownLoad(displayUri + orignal +data.data.qrCodeUrl,'downloadQR'));
        } else {
            $("#mmbMasterDetailArea").modal('hide');
            showAlert('取得失败,原因:' + data.resultMessage);
        }
    };
    var errorCallback = function () {
        $("#mmbMasterDetailArea").modal('hide');
        showAlert('网络异常.');
    };
    // axse(url, {"data": JSON.stringify(param)}, successCallback, errorCallback);
    axse(url, {"data": JSON.stringify(param)}, successCallback, successCallback);

}
