/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
  6.歌词获取
    请求地址:https://autumnfish.cn/lyric
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌词的内容
*/

var yu = new Vue({
    el:'#yu',
    data:{
        query:'',
        song_list:[],
        music_url:'',
        music_img:'img/419野猪.png',
        wyy_bbll:[],
        isplay:false,
        mvurl:'',
        showmv:false,
        lyric:'',

    },
    methods:{
        search(){
            var this_yu=this;
            axios.get('https://autumnfish.cn/search?keywords='+this.query)
            .then(function(res){
                this_yu.song_list=res.data.result.songs;
                // console.log(this_yu.song_list);
            },function(err){

            });
            
            
        },
        music(musicid){
            var this_yu=this;
            axios.get("https://autumnfish.cn/song/url?id="+musicid.id)
            .then(function(res){
                // console.log(res);
                this_yu.music_url=res.data.data[0].url;
            },function(err){

            });
            axios.get('https://autumnfish.cn/song/detail?ids='+musicid.id)
            .then(function(res){
                // console.log(res);
                this_yu.music_img=res.data.songs[0].al.picUrl;
                // console.log(this_yu.music_img)
            },function(err){
                
            });
            axios.get('https://autumnfish.cn/comment/hot?type=0&id='+musicid.id)
            .then(function(res){
                // console.log(res);
                this_yu.wyy_bbll=res.data.hotComments;
                // console.log(this_yu.wyy_bbll)
            },function(err){
                
            });
            axios.get('https://autumnfish.cn/lyric?id='+musicid.id)
            .then(function(res){
                // console.log(res);
                this_yu.lyric = res.data.lrc.lyric.split("\n");
              
            },function(err){
                
            });
        },
        play(){
          this.isplay=true;
        },
        pause(){
          this.isplay=false;
        } ,
        mv(mvid){
          var this_yu=this;
          axios.get('https://autumnfish.cn/mv/url?id='+mvid)
          .then(function(res){
            this_yu.showmv=true;
            this_yu.mvurl=res.data.data.url;
            // console.log(this_yu.mvurl);
          },function(err){

          });
        },
        closemv(){
          this.showmv=false;
          this.mvurl='';
        }
    }

})