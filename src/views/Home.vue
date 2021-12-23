<template>
  <div class="home">
    <div class="banner">
      <el-carousel :interval="4000" type="card" :height="banner_height">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <el-image
            style="height: 100%"
            v-if="item.imageUrl"
            :src="item.imageUrl + `?param=700y280`"
            :title="item.typeTitle"
            alt=""
          >
            <div slot="error" class="image-slot">{{ `  ` }}</div>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="recommend-container page-container">
      <div class="title">
        <div class="left">歌单推荐</div>
        <div class="right">
          <span>更多</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="content">
        <div class="leftBox">
          <div class="mask"></div>
          <img class="box-bg" :src="require('@/assets/images/img-bg.jpg')" />
          <div class="item-grid">
            <div class="grid-container">
              <div class="span-in">专属推荐歌单</div>
              <div class="mask mask2"></div>
              <img :src="require('@/assets/images/img-bg.jpg')" />
              <div class="bottom-text">开启你的专属歌单</div>
            </div>
          </div>
        </div>
        <div class="rightBox">
          <Card :dataList="personalizedData" :num="10" />
        </div>
      </div>
    </div>
    <div class="song-container">
      <div class="song-title">song-title</div>
      <div class="song-content-container">
        <div class="page-container song-content">
          <div class="song-left">
            <div class="song-left-container">
              <div class="left-img-box" v-for="(item, index) in topSongData" :key="index">
                <el-image
                  lazy
                  style="height: 100%; width: 100%"
                  v-if="item.picUrl"
                  :src="item.picUrl + `?param=204y211`"
                />
              </div>
            </div>
          </div>
          <div class="song-right">
            <Card
              lazy
              :dataList="topSongData"
              :num="8"
              itemWidth="50%"
              justify="flex-start"
              imgWidth="80"
              textMode="row"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="page-container">
      <Card lazy :dataList="topAlbumData" :num="10" title="新碟上架" itemPadding="26px" imgWidth="190" />
    </div>
    <div class="rank-container">
      <div class="card-title page-container title">
        <div class="left">排行榜</div>
        <div class="right">
          <span>更多</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="rank-content-container">
        <div class="page-container rank-content">
          <div class="rank-left">
            <div class="left-container">
              <el-carousel
                style="width: 428px"
                :autoplay="false"
                arrow="always"
                :interval="4000"
                type="card"
                height="200px"
                indicator-position="none"
                @change="carouselChange"
              >
                <el-carousel-item v-for="(item, index) in topList.slice(0, 5)" :key="index">
                  <el-image
                    fit="fill"
                    style="width: 214px; height: 214px"
                    v-if="item.coverImgUrl"
                    :src="item.coverImgUrl + `?param=214y214`"
                    :title="item.name"
                    alt=""
                  >
                    <div slot="error" class="image-slot">{{ `  ` }}</div>
                  </el-image>
                </el-carousel-item>
              </el-carousel>
              <div class="color-main">{{ topList[currentIndex].name }}</div>
              <div class="color-desc">{{ topList[currentIndex].updateFrequency }}</div>
              <div>3333</div>
            </div>
          </div>
          <Card
            lazy
            class="rank-right"
            :dataList="rankData"
            :num="5"
            imgWidth="80"
            display="block"
            textMode="row"
            itemWidth="100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { globalConfig } from '@/utils/global';
import { banner, personalized, topAlbum, topSong, toplist, playlistDetail } from '@/utils/request';
import Card from '@/components/Card.vue';
export default {
  name: 'Home',
  components: {
    Card,
  },
  data() {
    return {
      currentIndex: 0,
      banner_height: globalConfig.banner_height,
      bannerList: [{}, {}, {}],
      personalizedData: [],
      topAlbumData: [],
      rankData: [],
      topSongData: [],
      topList: [{}, {}, {}],
    };
  },
  created() {
    this.getBannerData();
    this.getPersonalizedData();
    this.getTopAlbumData();
    this.getTopSong();
    this.getRankData();
  },
  methods: {
    carouselChange(index) {
      this.currentIndex = index;
    },
    async getBannerData() {
      const data = await banner();
      if (data.code == 200) {
        this.bannerList = data.banners;
      }
    },
    async getPersonalizedData() {
      const data = await personalized({ limit: 10 });
      if (data.code == 200) {
        this.personalizedData = data.result;
      }
    },
    async getTopAlbumData() {
      const data = await topAlbum({ type: 'hot', limit: 10 });
      if (data.code == 200) {
        this.topAlbumData = data.weekData;
      }
    },
    async getTopSong() {
      const data = await topSong({ type: 0 });
      if (data.code == 200) {
        this.topSongData = data.data.slice(0, 8).map((item) => {
          return { ...item.album, ...{ duration: item.duration } };
        });
      }
    },
    async getRankData() {
      const dataTop = await toplist();
      if (dataTop.code == 200) {
        this.topList = dataTop.list;
      }
      const data = await playlistDetail({ id: 19723756 });
      if (data.code == 200) {
        this.rankData = data.playlist.tracks.map((item) => {
          return { ...item.al, ...{ artists: item.ar, duration: item.dt } };
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.banner {
  padding: 40px 20px 0;
  max-width: 1300px;
  margin: 0 auto;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.color-main {
  font-size: 18px;
  font-weight: bold;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 0 30px;
  .left {
    color: $main-text-color;
    font-weight: bold;
    font-size: 24px;
  }
  .right {
    color: $desc-text-color;
  }
}
.recommend-container {
  .content {
    display: flex;
    justify-content: space-between;
    .leftBox {
      width: 20%;
      margin-right: 30px;
      overflow: hidden;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(116, 115, 115, 0.1);
        z-index: 100;
      }
      .mask2 {
        background: rgba(75, 75, 75, 0.2);
      }
      .box-bg {
        position: relative;
        z-index: 0;
        filter: blur(2rem);
      }
      .item-grid {
        position: absolute;
        width: 80%;
        .grid-container {
          position: relative;
          width: 100%;
          height: 100%;
          .span-in {
            display: block;
            position: absolute;
            width: 147px;
            height: 32px;
            text-align: center;
            line-height: 30px;
            font-size: 16px;
            color: #fff;
            background-color: #fe5987;
            top: -17px;
            left: 0;
            z-index: 200;
            border-radius: 4px 0 10px 4px;
            &:after {
              content: '';
              width: 0;
              height: 0;
              border-color: transparent transparent #c31043 #c31043;
              border-width: 9px 6px 8px 7px;
              border-style: solid;
              position: absolute;
              top: 0;
              left: 147px;
            }
          }
          .bottom-text {
            position: absolute;
            bottom: -30px;
            left: 0;
            font-size: 14;
            text-align: center;
            color: #fff;
            width: 100%;
          }
        }
      }
    }
    .rightBox {
      flex: 1;
    }
  }
}
.song-container {
  padding: 80px 0 50px;
  .song-title {
    padding-left: 30%;
  }
  .song-content-container {
    width: 100%;
    background: #f2f2f2;
    .song-content {
      display: flex;
      .song-left {
        width: 26%;
        position: relative;
      }
      .song-left-container {
        width: 100%;
        height: 122%;
        padding: 8px;
        position: absolute;
        left: 0;
        top: -58px;
        box-sizing: border-box;
        background-color: #333;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        &::before {
          content: '';
          width: 100%;
          height: 100%;
          background: url('~@/assets/images/song-bg.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2000;
        }
        .left-img-box {
          width: 50%;
          height: 33.33%;
        }
      }
      .song-right {
        flex: 1;
        padding: 15px 0 0 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
.rank-container {
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26px 0 30px;
    .left {
      color: $main-text-color;
      font-weight: bold;
      font-size: 24px;
    }
    .right {
      color: $desc-text-color;
    }
  }
  .rank-content-container {
    background: #f2f2f2;
    padding: 20px 0;
  }
  .rank-content {
    display: flex;
  }
  .rank-left {
    width: 50%;
    padding: 70px 20px 50px 0;
    .left-container {
      width: 75%;
      height: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
  .rank-right {
    width: 30%;
  }
}
</style>
