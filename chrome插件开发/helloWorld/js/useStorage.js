$(function() {
    chrome.storage.sync.get(['total', 'limit'], function(budget) {
        if (budget.total) {
            $('#total').text(parseFloat(budget.total))
        }
        if (budget.limit) {
            $('#limit').text(parseFloat(budget.limit))
        }
    })
    $('#add').click(function(){
        // 从浏览器中获取存储的数据
        chrome.storage.sync.get('total', function(budget) {
            var totalAmount = 0; // 总金额
            if (budget.total) {
                totalAmount = parseFloat(budget.total)
            }
            // 将本次金额加到总金额并存储
            var amount = $('#amount').val()
            if (amount) {
                totalAmount += parseFloat(amount)
                chrome.storage.sync.set({'total': totalAmount})
            }
            // 更新ui
            $('#total').text(totalAmount)
            $("#amount").val('')
        })
    })
})