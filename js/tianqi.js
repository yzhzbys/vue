

var app = new Vue({
    el:'#yuyu',
    data:{
        city:'',
        index_city:'长沙',
        list:[]
    },
    methods:{
        search(){
            // console.log('查询的天气');
            // console.log(this.city);
            var this_yu=this;
            axios.get('http://wthrcdn.etouch.cn/weather_mini',{params:{city:this.city}})
            .then(function(res){
                console.log(res);
                this_yu.list=res.data.data.forecast;
                console.log(this_yu.list);
            }).catch(function(err){

            })
        },
        changecity(city){
            this.city=city
            this.search();
        }
        
    },
    mounted(index_city){
        console.log('当前默认城市：'+this.index_city);
        this.changecity(this.index_city);;
        this.city='';

    }
})