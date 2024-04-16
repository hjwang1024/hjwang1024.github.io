<template>
    <div class="hero">
        <div class="home-blog-hero">
            <img
                alt="卡夫卡的岛上书店"
                src="/blogs/img/hero-img.png"
                class="hero-img"
                style="
                    transition: transform 0.25s ease-in-out 0.06s, opacity 0.25s ease-in-out 0.06s;
                    transform: translateY(0px);
                    opacity: 1;
                "
            />
            <div
                class="description"
                style="
                    transition: transform 0.25s ease-in-out 0.16s, opacity 0.25s ease-in-out 0.16s;
                    transform: translateY(0px);
                    opacity: 1;
                "
            >
                记住该记住的，忘记该忘记的。改变能改变的，接受不能改变的。——杰罗姆·大卫·塞林格《麦田里的守望者》
            </div>
            <div
                class="hero-link-box"
                style="
                    transition: transform 0.25s ease-in-out 0.26s, opacity 0.25s ease-in-out 0.26s;
                    transform: translateY(0px);
                    opacity: 1;
                "
            >
                <a class="hero-link"><i class="fas fa-chevron-down" aria-hidden="true"></i></a>
            </div>
        </div>
        <canvas
            width="1440"
            height="502"
            id="particleClockCanvas"
            class="home-blog-canvas"
            style="position: absolute; left: 0px; top: 0px"
        ></canvas>
        <canvas width="1440" height="502" style="position: absolute; top: 0px; left: 0px"></canvas>
        <div
            class="hero-img-background"
            style="background-image: url('http://kaimo313.gitee.io/images/douban/img/bg-img-32.jpg')"
        ></div>
        <div id="home-blog-wrapper-totop"></div>
    </div>
</template>

<script>
import ParticleClock from './particle-clock'
export default {
    data() {},
    mounted() {
        // 粒子时钟初始化
        ParticleClock().init('particleClockCanvas')
        // 初始化动态的名言警句
        // this.getFamousQuotes()
        // 设置背景图
        // this.setHeroBackgroundImage()
    },
    methotds: {},
}
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0px auto;
  .hero {
    margin $navbarHeight auto 0
    position relative
    box-sizing border-box
    padding 0 20px
    height calc(100vh - 3.6rem)
    overflow hidden
    text-align center
    display flex
    align-items center
    justify-content center
    .hero-img {
      max-width: 30rem;
      margin: 0 auto 1rem
    }

    .description {
      font-size: 1.5rem
      color #242424
    }
  }

  .home-blog-wrapper {
    .info-wrapper {
      position -webkit-sticky
      position sticky
      overflow hidden
      transition all .3s
      margin-left 15px
      flex 0 0 300px
      height auto
      box-shadow var(--box-shadow)
      border-radius $borderRadius
      box-sizing border-box
      padding 0 15px
      transition box-shadow .4s
      &:hover {
        box-shadow var(--box-shadow-hover)
      }
    }
  }
}

@keyframes background-size-animation {
	0% {
    transform scale(1.2)
  }
  100% {
    transform scale(1)
  }
}

.hero
  cursor url(/blogs/favicon.ico), auto !important
  canvas
    width 100% !important
    height calc(100vh - 3.6rem) !important
    z-index -1
  .home-blog-canvas
    z-index -2
    opacity 0.8
  .hero-img-background
    position absolute
    left 0
    top 0
    width 100% !important
    height calc(100vh - 3.6rem) !important
    z-index -3
    animation background-size-animation 6s ease-out 0s 1
    background-repeat no-repeat
    background-position center center
    background-size cover

#home-blog-wrapper-totop
  position absolute
  bottom 3.4rem

@keyframes breathe-down-animation {
	0% {
    bottom -10rem
  }
  100% {
    bottom -10.4rem
  }
}

.home-blog-hero
  position relative
  height 12rem
  .hero-link-box
    width 100%
    position absolute
    bottom -10rem
    text-align center
    animation breathe-down-animation 1s linear 0s infinite alternate
    a
      display inline-block
      width 3rem
      height 3rem
      line-height 3rem
      border-radius 50%
      font-size 1.6rem
      text-align center
      cursor pointer
      box-shadow var(--box-shadow)
      color #fff
      &:hover
        box-shadow var(--box-shadow-hover)
      i
        color #fff

// 分页不在第一页时，隐藏banner栏
.hero.hide-banner
  display none
  & + .home-blog-wrapper
    margin-top ($navbarHeight)

.home-blog-wrapper
  overflow hidden
  .info-item
    .item-title
      display flex
      justify-content space-between
      align-items center
      line-height 1.2rem
      span
        &.title
          font-weight 600
          i
            color var(--text-color-sub)
            &.reco-tag
              font-size .95rem
            &.reco-friend
              font-size .9rem
        &.num
          color #fff
          border-radius $borderRadius
          padding 0 0.2rem
          min-width 1rem
          height 1rem
          line-height 1rem
          text-align center

@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
      .hero-img {
        max-width: 20rem;
        margin: 1rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin 0
        width 100%
        padding-top 1rem
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      img {
        max-height: 210px;
        margin: 1rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin 0
        width 100%
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}
</style>
