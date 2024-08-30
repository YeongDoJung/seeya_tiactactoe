/**
 * Created by Spirit on 2017-01-19.
 */

var dialog = {

    addElem:"<div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><h2 class='modal-title' id='divModalAlertLabel'></h2></div>"+
        "<div class='modal-body text-center'></div>",
    addElemIframe:"<div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><h2 class='modal-title' id='divModalAlertLabel'></h2></div>"+
        "<div class='modal-body'><iframe frameborder='0' allowtransparency='true'></iframe></div>",

    defaultAlert : function(title , msg, callbackFunc) {

        $('#divAlertArea').html(this.addElem + "<div class='modal-footer'><button type='button' class='btn btn-primary btn-modal-close'>닫기</button></div>")
            .find('.modal-title').html(title)
            .end().find('.modal-body').html(msg);

        $('#divModalAlert').off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
            if (typeof callbackFunc == 'function') {
                callbackFunc(true);
            }
        });

        $('.btn-modal-close').one("click", function() {
            $("#divModalAlert").modal("hide");
        });
    },
    /* ////////////////////////////////////////////////////////////////// */
    confirmAlert : function(title , msg, callbackFunc, rejectFunc) {
        $('#divConfirmAlertArea').html(this.addElem + "<div class='modal-footer'><button type='button' class='btn btn-default btn-modal-ok'>확인</button> <button type='button' class='btn btn-primary btn-modal-close'>닫기</button></div>")
            .find('.modal-title').html(title)
            .end().find('.modal-body').html(msg);

        $('.btn-modal-ok').bind("click", function() {
            if (typeof callbackFunc == 'function') {
                // setTimeout(callbackFunc, 400);
                callbackFunc(true);
                $("#divModalConfirmAlert").modal("hide");
            }else{

            }

        });

        $('.btn-modal-close').one("click", function() {
            if (typeof rejectFunc == 'function') {
                rejectFunc();
            }
            $("#divModalConfirmAlert").modal("hide");
        });
    }
};
