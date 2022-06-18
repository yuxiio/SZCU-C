$(document).ready(function () {
    str = "[00:07.23]We're fading,by aging\n[00:10.66]We can not talk it over\n[00:14.07]No longer,i wonder\n[00:17.24]Cause you and i are over\n[00:20.40]You came\n[00:22.86]You can't hide under the rader\n[00:27.09]You came\n[00:29.46]There is no conviction you are so far\n[00:33.98]Are you waiting waiting for me you\n[00:37.45]Are you waiting waiting for me you\n[00:40.82]Are you waiting waiting for me you\n[00:44.93]Are you waiting\n[00:47.32]Are you waiting waiting for me you\n[00:50.74]Are you waiting waiting for me you\n[00:54.08]Are you waiting waiting for me you\n[00:58.31]Are you waiting\n[01:14.03]Like before,not anymore\n[01:17.63]I think it's time to cut off\n[01:21.02]But you're staying\n[01:22.82]And waiting\n[01:24.52]For you are so far from my love\n[01:27.49]You came\n[01:29.91]You can't hide under the rader\n[01:34.71]You came\n[01:36.72]There is no conviction you are so far\n[01:41.10]Are you waiting waiting for me you\n[01:44.45]Are you waiting waiting for me you\n[01:47.87]Are you waiting waiting for me you\n[01:52.01]Are you waiting\n[02:08.33]Hold your breath\n[02:11.18]Count to ten\n[02:12.02]You and me can still win\n[02:15.24]See the light\n[02:16.90]Let it go\n[02:18.89]Are you waiting\n[02:31.43]Are you waiting\n[02:32.82]Are you waiting\n[02:46.21]Tell me are you waiting\n[02:53.95]Are you waiting\n[02:56.26]Are you waiting waiting for me you\n[02:59.20]Are you waiting\n"
    arr = str.split("\n")
    times = []
    words = []
    for (var i = 0; i < arr.length - 1; i++) {
        s = arr[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g).toString()
        words.push(arr[i].toString().replace(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g, ''))
        times.push(s.substr(1, 5))
    }
    

    $("#play").hide()//首先将play图标隐藏
    $("#main").height($("#home").height() - $("#display").height() - 2 - $("#header").height())
    var len = ($("#display").width() - $("#controlPanel").width()) / 2;
    // Attr(len)
    // alert(len)
    $("#right_part").width(len)
    // $("#controlPanel").width(400)



    var audio = $('#audioTag').get(0);
    //播放暂停控制

    $('#play-audio').click(function () {

        //监听音频播放时间并更新进度条
        audio.addEventListener('timeupdate', updateProgress, false);
        //监听播放完成事件
        audio.addEventListener('ended', audioEnded, false);


        //改变暂停/播放icon
        if (audio.paused) {
            audio.play();
            $('#play').show()
            $('#pause').hide()
            // alert(helo)

        } else {
            audio.pause();
            $('#pause').show()
            $('#play').hide()
        }
    })

    //读取视频长度,设置页面时长显示-loadedmetadata:指定视频/音频（audio/video）的元数据加载后触发
    //audio.duration 获取音频的时长，单位为秒
    $('#audioTag').on("loadedmetadata", function () {
        //alert(audio.duration)
        $('#play-time').text(transTime(this.duration));
    });

    var playWidth = $('#bar-line').width(); 
    //点击进度条跳到指定点播放
    $('#bar').click(function (e) {
        // alert("yese")
        // var rate = (e.offsetX - ($(this).width() - playWidth) / 2) / playWidth;
        var rate = (e.offsetX - playWidth) / $('#bar').width()
        // alert(rate)
        audio.currentTime = audio.duration * rate;
        updateProgress();
    });



    $('#played-time').bind('DOMNodeInserted', function(){
        // console.log("1")
        // alert("sss")
        for(i = 0 ; i < times.length ; i++){
            if($('#played-time').text() == times[i]){
                console.log("1")
                $('#song').html(words[i])
            }
            
        }
    });

});

//更新进度条
function updateProgress() {
    var audio = document.getElementsByTagName('audio')[0];
    var value = Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100, 0);
    $('#bar-line').css('width', value + '%');
    time = transTime(audio.currentTime);
    $('#played-time').text(time);
}

//转换音频时长显示
function transTime(time) {
    var duration = parseInt(time);
    var minute = parseInt(duration / 60);
    var sec = duration % 60 + '';
    var isM0 = ':';
    if (minute == 0) {
        minute = '00';
    } else if (minute < 10) {
        minute = '0' + minute;
    }
    if (sec.length == 1) {
        sec = '0' + sec;
    }
    return minute + isM0 + sec
}

//播放完成
function audioEnded() {
    var audio = document.getElementsByTagName('audio')[0];
    audio.currentTime = 0;
    audio.pause();
    $('#play').show()
    $('#pause').hide()
}



