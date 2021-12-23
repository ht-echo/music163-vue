<template>
  <div class="card">
    <div class="card-title" v-if="title">
      <div class="left color-main">{{ title }}</div>
      <div class="right color-desc">
        <span>更多</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="content-contaner" :style="{ display: display, margin: `0 -${itemPadding}` }">
      <div
        :style="{ width: itemWidth, 'justify-content': justify }"
        class="card-content"
        v-for="(item, index) in songList"
        :key="index"
      >
        <el-card shadow="never" style="margin-bottom: 20px; width: 100%" :body-style="bodyStyle">
          <div class="card-info-container" :class="{ 'card-info-flex': textMode == 'row' }">
            <div
              class="play-left-container"
              :style="{ padding: `0 ${itemPadding}`, margin: `0 -${textMode == 'row' ? itemPadding : '0'}` }"
            >
              <div class="play-left">
                <div class="image-box" :style="{ width: imgWidthNew, height: imgWidthNew }">
                  <div class="top-num" v-if="item.playCount && textMode == 'vertical'">
                    <el-image
                      style="width: 14px; height: 14px"
                      :src="require('@/assets/images/playCount.png')"
                    />
                    <span>{{ getPlayCount(item.playCount) }}</span>
                  </div>

                  <el-image
                    fit="fill"
                    :style="{ width: imgWidthNew, height: imgWidthNew }"
                    :lazy="lazy"
                    :title="item.name"
                    class="card-img"
                    :src="item.picUrl + `?param=${imgWidth}y${imgWidth}`"
                  >
                    <div slot="error" class="image-slot">
                      <el-image
                        :style="{ width: imgWidthNew, height: imgWidthNew }"
                        class="card-img error-img"
                        fit="cover"
                        :src="require('@/assets/images/error.png')"
                      />
                    </div>
                  </el-image>
                  <el-image class="hover-play" fit="cover" :src="require('@/assets/images/btn-play.png')" />
                </div>
                <div v-if="textMode == 'row'" class="card-text left-text" :title="item.name">
                  <div>{{ item.name }}</div>
                  <div class="card-text desc-color">
                    {{ item.artists && item.artists.map((item) => item.name).join('/') }}
                  </div>
                </div>
              </div>
              <div v-if="textMode == 'vertical'" class="bottom-text" :title="item.name">
                <div class="card-text" :style="{ width: imgWidthNew }">{{ item.name }}</div>
              </div>
            </div>
            <div v-if="textMode == 'row'" class="card-text desc-color" :title="item.name">
              {{ getDurtion(item.duration) }}
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlayCount } from '@/utils/tools';
export default {
  props: {
    title: String,
    num: {
      type: Number,
      default: 0,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    itemWidth: {
      type: String,
      default: '20%',
    },
    justify: {
      type: String,
      default: 'flex-end',
    },
    imgWidth: {
      type: String,
      default: '160',
    },
    textMode: {
      type: String,
      default: 'vertical',
    },
    display: {
      type: String,
      default: 'flex',
    },
    itemPadding: {
      type: String,
      default: '24px',
    },
  },
  data() {
    return {
      bodyStyle: {
        padding: 0,
      },
    };
  },
  computed: {
    songList() {
      if (this.dataList.length === 0 && this.num) {
        const temp = Array(this.num).fill({});
        return temp;
      }
      return this.dataList.slice(0, this.num);
    },
    imgWidthNew() {
      return this.imgWidth + 'px';
    },
  },
  mounted() {
    console.log(`songList`, this.songList)
  },
  methods: {
    getPlayCount,
    getDurtion(duration) {
      if (!duration) {
        return '00:00';
      }
      let minute = parseInt(duration / 1000 / 60);
      let second = parseInt((duration / 1000) % 60);
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;

      return minute + ':' + second;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  border: none;
  background-color: transparent;
}
.desc-color {
  margin-right: 40px;
  color: #999;
}
.card {
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
  }
  .content-contaner {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .card-content {
    display: flex;
  }
  .card-info-container {
    cursor: pointer;
    width: 100%;
    &:hover {
      .hover-play {
        display: block;
      }
    }
    .play-left-container {
      box-sizing: border-box;
    }
    .image-box {
      position: relative;
      background: #efefef;
      border-radius: 8px;
      .top-num {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 0 5px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        font-size: 12px;
        line-height: 24px;
        z-index: 1;
        display: flex;
        align-items: center;
        span {
          padding-left: 5px;
        }
      }
    }
    .card-img {
      border-radius: 8px;
      width: 100%;
      // max-width: 160px;
      height: 100%;
    }
    .hover-play {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 35%;
      height: 35%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      &:hover {
        animation: pulse 2s infinite;
      }
    }
    .play-left {
      display: flex;
      align-items: center;
      justify-content: center;

      .left-text {
        margin-left: 20px;
      }
    }
    .bottom-text {
      padding: 10px 0 10px;
      display: flex;
      justify-content: center;
    }
  }
  .card-info-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  .card-text {
    padding-top: 6px;
    cursor: pointer;
    @extend %line-one;
  }
}
</style>
