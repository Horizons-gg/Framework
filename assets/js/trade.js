//
// Stream
//
var socket = io()

socket.on('onlineUsers', function (response) {
    $('#onlineUsers').html(response.html)
    removeOwnerSend()
})

socket.on('disconnect', () => {
    console.log('Connection with the server has been lost...')
    $('#warningPopupTitle').html('Connection Lost')
    $('#warningPopupDescription').html('Connection to the server was lost or reset, this was most likely due to a server side update')
    $('#openWarningPopup').click()
    setTimeout(() => { window.location.reload() }, 5000)
})

socket.on('message', function (msg) {
    var chat = $('#liveChat').append(msg + '\n')
    if (chat.length) {
        chat.scrollTop(chat[0].scrollHeight - chat.height())
    }
})

socket.on('alertPopup', function (data) {
    if (data.type === 'warning') {
        $('#warningPopupTitle').html(data.title)
        $('#warningPopupDescription').html(data.description)
        $('#openWarningPopup').click()
    }

    if (data.type === 'success') {
        $('#successPopupTitle').html(data.title)
        $('#successPopupDescription').html(data.description)
        $('#openSuccessPopup').click()
    }

    if (data.type === 'flagged') {
        $('#warningPopupTitle').html('Account Flagged')
        $('#warningPopupDescription').html('Your Account has been flagged and you will no longer be able to access the Trade Center until you have been Unflagged by an Administrator.')
        $('#openWarningPopup').click()
        setTimeout(() => { window.location.reload() }, 5000)
    }
})

function sendMessage() {
    if ($('#chatMessage').val() === '') return
    socket.emit('message', $('#chatMessage').val())
    $('#chatMessage').val('')
}
$('#chatMessage').on('keydown', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) sendMessage()
})

socket.on('dataUpdate', function (data) {
    var userData = data.userData
    var tradeData = data.tradeData

    user = userData
    trade = tradeData

    $('#credits').html(`Balance: ${addCommas(tradeData.credits)}cr`)

    var stockValue = 0
    for (material in tradeData.mine_material) {
        $(`#${material}Bar`).css('width', tradeData.mine_percent[material] + '%'), $(`#${material}Pcs`).html(tradeData.mine_material[material] + ' pcs')
        stockValue += trade.mine_value[material] * trade.mine_material[material]
    }
    $('#sellButton').html(`Sell Stock (${addCommas(stockValue)}cr)`)
})



//
// Clicker
//

var trade = {}
var user = {}
var pageLoad = false

function addCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function mineClick(material) {
    socket.emit('click', material)
}



//
// Store
//

function selectAllResources() {
    for (material in trade.mine_material) {
        $(`#${material}Sell`).val(trade.mine_material[material])
    }
}

function sellSelectedResources() {
    socket.emit('sell-resources')
}



// Fetch Online Users
var lastSearch
function sendMoneyPrep() {
    $('#userSearchPanel').show()
    $('#userSendPanel').hide()
    $('#send-onlineUsers').html('')
    $('#send-searchResults').html('')

    $('#send-close-button').show()
    $('#send-back-button').hide()
    $('#send-button').hide()

    socket.emit('fetch-onlineUsers')
    searchUserDb(true)
}

function searchUserDb(status) {
    setTimeout(() => {
        var search = $('#searchUser').val()
        if (lastSearch === search && !status) return
        lastSearch = search

        if (search.trim().length <= 0) return $('#send-searchResults').html('')
        $('#send-searchResults').html('')
        socket.emit('fetch-userSearch', search.trim())
    }, 100)
}

socket.on('recieve-onlineUser', function (html) {
    $('#send-onlineUsers').html('')
    $('#send-onlineUsers').append(html)
})
socket.on('recieve-userResult', function (html) {
    $('#send-searchResults').html('')
    $('#send-searchResults').append(html)
})

var sendData
socket.on('recieve-selection', function (data) {
    sendData = data
    $('#userSearchPanel').hide()
    $('#userSendPanel').show()

    $('#send-close-button').hide()
    $('#send-back-button').show()
    $('#send-button').show()

    $('#send-username').html(data.user.username)
    $('#send-discriminator').html('#' + data.user.discriminator)
    $('#send-credits').html(`Balance: ${data.trade.credits}cr`)
    $('#send-avatar').attr("src", `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.png`)

})

function sendMoney() {
    socket.emit('send-credits', { "id": sendData.user.id, "credits": $('#sendAmount').val() })
    $('#send-close-button').click()
    $('#sendAmount').val('')
}









//
// Administration
//

function flaggedOptions(id, opt) {
    var formdata = new FormData()
    formdata.append("id", id)
    formdata.append("opt", opt)

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("/trade/flagged-options", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.status)
            if (result.status === 200) window.location.reload()
            //else return alert(result.body)
        })
        .catch(error => console.log('error', error))
}

function lookupUser() {
    var formdata = new FormData()
    formdata.append("id", $("#discord-id").val())

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("/trade/user-lookup", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status === 200) {
                document.getElementById("user-info").innerHTML = result.body
            }
            else {

            }
        })
        .catch(error => console.log('error', error))
}

function userOptions(id, opt) {
    var formdata = new FormData()
    formdata.append("id", id)
    formdata.append("opt", opt)

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("/trade/user-options", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.status)
            if (result.status === 200) lookupUser()
        })
        .catch(error => console.log('error', error))
}

function refreshUserLookup() {
    if ($("#discord-id").val() !== "") lookupUser()
    setTimeout(refreshUserLookup, 5000)
} setTimeout(refreshUserLookup, 2000)





function removeOwnerSend() {
    try {
        $(`#user-send-${user.discord.id}`).remove()
    } catch {
        setTimeout(removeOwnerSend, 100)
    }
} removeOwnerSend()