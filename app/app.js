
var pageNum = 0;
var th_pressed;
var td_className;
var end = 6;
var start = 1;
var logElements = 0;
var class_num, index, search_by, searchData;

Logger.success("success", "Dashboard loaded successfully", 7000);
if (pageNum <= 0) {
    pageNum = 0;
    end = 6;
    reRenderTable(pageNum);
    start = pageNum + 1;
}
$('thead').on('click', 'th', function (event) {
    th_pressed = $(this).attr('id');
    var test = '#' + th_pressed;
    td_className = $(this).text();
    if (test == "#select_header" || test == "#action-header") topSort("id");
    else topSort(td_className);
});

$("select").change(function () {
    search_by = $("select option:selected").val();

}).trigger("change");
$('.search-btn').click(function () {
    searchData = $('.search-data-input').val();
    if (searchData == "") reRenderTable(pageNum);
    var matchedItem = studentsData.filter(findElement);
    if (matchedItem) {
        $('#MyTableBody').empty();
        matchedItem.map(insertIntoTable);
    }


});
function insertIntoTable(item) {
    var $searchRowItem = $($('#stundetRowTemplate').html()).clone();
    $searchRowItem.find('.id').text(item.id);
    $searchRowItem.find('.firstName').text(item.firstName);
    $searchRowItem.find('.lastName').text(item.lastName);
    $searchRowItem.find('.email').text(item.email);
    $searchRowItem.find('.graduated').text(item.graduated);
    $searchRowItem.find('.address').text(item.address);
    $searchRowItem.find('.gender').text(item.gender);
    $searchRowItem.find('.sallary').text(item.sallary);
    $searchRowItem.find('.birthdate').text(item.birthdate);
    $searchRowItem.find('.action').find('.delete').addClass("" + item.id);
    $searchRowItem.find('.action').find('.view-data').addClass("" + item.id);
    $('#MyTableBody').append($searchRowItem);
}
function findElement(item) {
    search_by = $("select option:selected").val();

    if (item[search_by].startsWith("" + searchData)) {
        return item;
    }
}

$('.search-data-input').keyup(function () {
    $('.suggested').empty();
    searchData = $('.search-data-input').val();
    var result = studentsData
        .filter(findElement)
        .map(function (obj) {
            var suggestedName = $($('#suggestedNamesTemplate').html()).clone();
            suggestedName.find('a').text(obj[search_by]);
            $('.suggested').append(suggestedName);
        });

});
$('ul').on('click', '.suggestedItem', function () {
    var selected_row = $(this).text();

    $('.search-data-input').text("" + selected_row)
    searchData = selected_row;
    var item = studentsData.find(findElement);
    if (item)
        $('#MyTableBody').empty();
    insertIntoTable(item);

    Logger.success("success", "search done", 5000);
});
function whichPage() {
    if (studentsData.length > 50 && studentsData.length <= 60) {
        end = 6;
    }
    else if (studentsData.length > 40 && studentsData.length <= 50) {
        end = 5;
    }
    else if (studentsData.length > 30 && studentsData.length <= 40) {
        end = 4;
    } else if (studentsData.length > 20 && studentsData.length <= 30) {
        end = 3;
    } else if (studentsData.length > 10 && studentsData.length <= 20) {
        end = 2;
    } else if (studentsData.length > 0 && studentsData.length <= 10) {
        end = 1;
    }
    start = pageNum + 1;
}
function reRenderTable(num) {
    $('#MyTableBody').empty();
    for (i = 0; i < 10; i++) {
        var it = (num * 10 + i);
        var item = studentsData[it];
        if (item) {
            var $rowItem = $($('#stundetRowTemplate').html()).clone();
            $rowItem.data('trNum', it);
            $($rowItem).find('.select').data("selectNum", it);
            $rowItem.find('.id').text(item.id);
            $rowItem.find('.firstName').text(item.firstName);
            $rowItem.find('.lastName').text(item.lastName);
            $rowItem.find('.email').text(item.email);
            $rowItem.find('.graduated').text(item.graduated);
            $rowItem.find('.address').text(item.address);
            $rowItem.find('.gender').text(item.gender);
            $rowItem.find('.sallary').text(item.sallary);
            $rowItem.find('.birthdate').text(item.birthdate);
            $rowItem.find('.action').find('.delete').addClass("" + item.id);
            $rowItem.find('.action').find('.view-data').addClass("" + item.id);
            $('#MyTableBody').append($rowItem);
        }
    }
    whichPage();
    $('.page-details').html("page " + start + "  of " + end);
}
function sortData(tdText) {
    studentsData.sort(function (a, b) {

        if (((a[tdText]) > (b[tdText]))) {
            return 1;
        }
        if (((a[tdText]) == (b[tdText]))) {
            return 0;
        }
        if (((a[tdText]) < (b[tdText]))) {
            return -1;
        }

    });

    Logger.success("success", "sorted done successfully by " + td_className, 5000);
}
function topSort(col) {
    sortData(col);
    reRenderTable(pageNum);
}
function findElementIndexById(cls) {
    for (j = 0; j < studentsData.length; j++)
        if (studentsData[j].id == cls) {
            return j;
        }
}
function deleteRecord(index, item) {
    result = window.confirm("Do you really want to delete this record?");
    if (result) {

        studentsData.splice(index, 1);
        $(item).closest('tr').hide(1000, function (e) {
            $(this).remove();
            reRenderTable(pageNum);
        });
    }
    else {
        Logger.warning("warning", "delete command canceled", 5000);
        return 0
    };
}
function printData(class_num) {

    $('.modal-body').html('<div class="idd">id: ' + studentsData[class_num].id + '</div><br/><div class="fName">firstName:' + studentsData[class_num].firstName + '</div><br/><div class="lName">lastName: ' + studentsData[class_num].lastName + '</div><br/><div class="gen">gender:' + studentsData[class_num].gender + '</div><br/><div class="birth">birthdate: ' + studentsData[class_num].birthdate + '</div><br/><div class="addr">address:' + studentsData[class_num].address + '</div><br/> <div class="e-mail">email: ' + studentsData[class_num].email + '</div><br/><div class="sal">sallary:' + studentsData[class_num].sallary + '</div><br/><div class="gra">graduated:' + studentsData[class_num].graduated + '</div>');
}
$('.previous').click(function () {

    if (pageNum > 0) {
        pageNum--;
    }
    reRenderTable(pageNum);
});
$('.next').click(function () {

    if (start >= end) {
        pageNum = end;
        start = end;
    }
    else if (start < end) {
        start++;
        pageNum++;
    }

    $('#MyTableBody').empty();
    reRenderTable(pageNum);
});
$("#MyTableBody").on('click', '.delete', function () {
    var trNum = $(this).closest('tr').data('trNum');
    console.log(trNum);
    deleteRecord(trNum, this);
});
$("#MyTableBody").on('click', '.view-data', function () {
    var trNum = $(this).closest('tr').data('trNum');
    printData(trNum);

});
$(".select").on('click', function () {
    $(this).closest('tr').toggleClass('selected');
});

var selectedNum = 0;
$('.select-all').change(function () {
    var checkboxes = $("#MyTableBody").find(':checkbox');

    if ($(this).is(':checked')) {
        checkboxes.prop('checked', true);
        checkboxes.closest('tr').addClass('selected');
    } else {
        checkboxes.prop('checked', false);
        checkboxes.closest('tr').removeClass('selected');
    }

});
/*
{if($('tr').data('selectNum').val())selectedNum
*/
$('.delete-all').click(function () {
    var selected_boxes = $("input:checked").val();
    var selectedItems = $('.selected').length;
    result = window.confirm("Do you really want to delete this record?");
    if (result) {

        for (var i = 0; i < selected_boxes.length; i++) {
            var index = $('#MyTableBody').find('.selected').data('trNum');
            console.log(index);
            var c = studentsData.splice(index, 1);
            console.log(c);
            $(this).closest('tr').remove();
            reRenderTable(pageNum);
        }
        $('.select-all').prop('checked', false);
        Logger.success("success", "delete done successfully", 5000);
    }
    else {
        Logger.warning("warning", "delete command canceled", 5000);
    }
});
$('.print-all').click(function () {

    var selected_boxes = $("input:checked");
    if (selected_boxes) {
        console.log("no checked boxes");

        Logger.error("error", "there is no selected item", 5000);
    }
    else {
        for (var i = 0; i < selected_boxes.length; i++) {
            class_num = $(this).attr('class').substring(11);
            index = findElementIndexById(class_num);
            var c = studentsData.splice(index, 1);
            console.log('id: ' + c[0].id + '\t \t firstName: ' + c[0].firstName + '\t \t lastName: ' + c[0].lastName + ' \t \t  gender:' + c[0].gender + '\t \t birthdate: ' + c[0].birthdate + '\t \t  address:' + c[0].address + '\t \t email: ' + c[0].email + '\t \t  sallary :' + c[0].sallary + '\t \t  graduated: ' + c[0].graduated + "\n");
        }
        Logger.success("success", "print done successfully check the console", 5000);


    }
});


