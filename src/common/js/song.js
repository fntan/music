export default class Song{
    constructor ({id,mid,singer,name,album,duration,image,url}){
        this.id =id
        this.imd = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }

}

export function createSong(musicData){
    return new Song({
        id:musicData.songid,
        mid:musicData.songmid,
        singer:filterSinger(musicData.singer),
        name:musicData.songname,
        album:musicData.albumname,
        duration:musicData.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M00${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://isure.stream.qqmusic.qq.com/${musicData.songid}.m4a?guid=8118646104&vkey=9C6AB18E894C1224C721DDE2A2A6D3F972C1F092ECA53D25AE8A7E1592B4E91BC1AC6325174D037128BB1ED27D131D42CA673558571A2022&uin=848&fromtag=3&r=12052020120880869`
    })
}

function filterSinger(singer){
    let ret = []
    if(!singer){
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}