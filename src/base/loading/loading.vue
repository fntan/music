<template>
    <div class="loading-box">
        <img src="../../common/images/default.jpg" alt="">
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'正在加载...'
        }
    }
}
</script>

<style scoped lang="stylus">
    .loading-box{
        text-align :center;
    }
</style>

