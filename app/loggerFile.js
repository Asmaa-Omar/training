var logElements = 0;

Logger.logs = [];
function Logger(info) {
    this.itemDomObj = $($('#logger-dev').html()).clone();
    this.time = info.duration || 7000;
    this.closable = info.closable || false;
    this.type = info.type;
    this.title = info.title;
    this.body = info.body;
    $(this.itemDomObj).data("logNum", (++logElements));
    $('#divLogg').css({
        "position": info.position || "fixed",
        "right": info.right || "20px",
        "top": info.top || "100px",
        "bottom": info.bottom || "",
        "left": info.left || "",
    });
    $(this.itemDomObj).find('.msg').html("" + this.body);
    $(this.itemDomObj).find('.title').html(this.title);

    if (this.type == "error") {
        $(this.itemDomObj).css({
            "background-color": "red",
        });
        $(this.itemDomObj).find('.icon').addClass("fa-exclamation-circle");
    }
    else if (this.type == "success") {
        $(this.itemDomObj).css({
            "background-color": "green",
        });
        $(this.itemDomObj).find('.icon').addClass("fa-check");
    }
    else if (this.type == "warning") {
        $(this.itemDomObj).css({
            "background-color": "orange",
        });
        $(this.itemDomObj).find('.icon').addClass("fa-exclamation-triangle")
    }
    if (this.closable) {
        $(this.itemDomObj).find('.close').addClass('fa-times');
    }
    Logger.logs.push(this);
    this.indexInLoggerArray = Logger.logs.length - 1;
    $('.closeLogges').show();

    this.show();
};
Logger.prototype.show = function () {
    var self = this;
    self.itemDomObj.hide();
    $('#divLogg').append(self.itemDomObj);
    self.itemDomObj.show(500);
    setTimeout(function () {
        removeItemFromLogsArray(self);
    }, self.time);
    Logger.updateCloseAllbuton();
}
Logger.removeItemFromLogsArray = removeItemFromLogsArray;

Logger.removeAll = function () {
    var item = Logger.logs.pop();
    while (item) {
        removeItemFromLogsArray(item);
        item = Logger.logs.pop();
    }
    $('.closeLogges').hide();
}
Logger.updateCloseAllbuton = function () {
    if (Logger.logs.length) $('.closeLogges').show();
    else $('.closeLogges').hide();
};
Logger.error = function (title, msg, duration) {
    var error = new Logger({ type: "error", title: title, body: msg, duration: duration, closable: true });
}
Logger.success = function (title, msg, duration) {
    var success = new Logger({ type: 'success', title: title, body: msg, duration: duration, closable: true });

}
Logger.warning = function (title, msg, duration) {
    var warning = new Logger({ type: 'warning', title: title, body: msg, duration: duration, closable: true });

}
$('.logger').on('click', '.close', function (e) {
    console.log(this);
    var selectedLog = $(this).parent().data('logNum');

    $("." + selectedLog).remove();
});

$('.closeLogges').on('click', function () {
    Logger.removeAll();
});



///////////////////////
function removeItemFromLogsArray(item) {
    if (item) {
        item.itemDomObj.hide(200, function () {
            item.itemDomObj.remove();
        });
        Logger.logs.splice(item.indexInLoggerArray, 1);
    }
    Logger.updateCloseAllbuton();
}