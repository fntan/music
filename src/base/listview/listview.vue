<template>
    <scroll class="listview" 
            :data="data" ref="listview" 
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scroll="scroll">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img v-lazy="item.avatar" class="avatar" alt="">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item,index) in shortcutList" 
                    class="item"
                    :data-index="index"
                    :class="{'current':currentIndex == index}"
                    >
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
    </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'

export default {
    props:{
        data:{
            type:Array,
            default:[]
        }
    },
    created(){
        this.touch = {}
        this.listenScroll = true,
        this.listHeight = [],
        this.probeType = 3
    },
    data(){
        return {
            scrollY:-1,
            currentIndex:0
        }
    },
    updated(){
   
    },
    computed:{
        shortcutList:function(){
            return this.data.map((group) =>{
                return group.title.substr(0,1)
            })
        },
        fixedTitle:function(){
            if(this.scrollY > 0){
                return ''
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
    },
    methods:{
        onShortcutTouchStart:function(e){
            let anchorIndex = getData(e.target,'index')
            this.scrollY = -this.listHeight[anchorIndex]
            this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex],0)
        },
        onShortcutTouchMove:function(e){
            
        },
        scroll:function(pos){
            this.scrollY = pos.y
        },
        _calculateHeight(){
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for(let i = 0;i<list.length;i++){
                let item = list[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        }
    },
    watch:{
        data:function(){
            setTimeout(() =>{
                this._calculateHeight()
            },20)
        },
        scrollY(newY){
            const listHeight = this.listHeight

            if(newY > 0){
                this.currentIndex = 0
                return false
            }

            for(let i = 0;i<listHeight.length-1;i++){
                let height1 = listHeight[i]
                let height2 = listHeight[i+1]
                if(-newY >= height1 && -newY < height2){
                    this.currentIndex = i
                    return 
                }
            }

            this.currentIndex = listHeight.length-2
        }
    },
    components:{
        Scroll
    }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
 @import "~common/stylus/variable"
.listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
</style>


