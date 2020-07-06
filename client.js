$(function() {
  var socket = io.connect('http://localhost:3000');
  var $input = $('input[name="message"]');
  var $list = $('ul');
  
  // テキストを元にチャットエリアにメッセージを追加する
  function createItem(text) {
    var $li = $('<li>').text(text);
    $list.append($li);
  }

  // フォームがサブミットされたらテキストをサーバーに送信する
  $('form').submit(function(e) {
    e.preventDefault();
    var text = $input.val();
  
    socket.emit('text', text);
    $input.val('');
  
    // 自分自身が送信したテキストはサーバーから受信しないのでここで
    // メッセージの追加を行う
    createItem(text);
  });

  socket.on('text', function(text) {
    createItem(text);
  });
});