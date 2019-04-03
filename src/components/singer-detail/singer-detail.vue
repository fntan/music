<template>
    <transition name="slide">
        <div class="singer-detail">asadsdfdggfggfggfgf</div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
    data(){
        return {
            songs:[]
        }
    },
    computed:{
        ...mapGetters([
            'singer'
        ])
    },
    created(){
        this.getDetail()
    },
    methods:{
        getDetail:function(){
            if(!this.singer.id){
                this.$router.push('/singer')
                return false
            }
            getSingerDetail(this.singer.id).then((res) =>{
                if(res.code == ERR_OK){
                    this.songs = this.normalizeSongs(res.data.list)
                    console.log(this.songs)
                }
            })
        },
        normalizeSongs(list){
            let ret = []
            list.forEach((item) =>{
                let {musicData} = item
                if(musicData.songid && musicData.albumid){
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    }
}
</script>

<style scoped lang="stylus">
.singer-detail
    position:fixed
    z-index 1000
    top:0
    bottom:0
    left:0
    right:0
    background:red
.slide-enter-active,.slide-leave-active
    transition:all 0.3s
.slide-enter,slide-leave-to
    transform :translate3d(100%,0,0)
</style>


