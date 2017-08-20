<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd">
        <div class="progress-btn" ref="progressBtn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const BTN_WIDTH = 16
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initialed = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initialed) {
          return
        }
        const deltax = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - BTN_WIDTH, Math.max(0, this.touch.left + deltax))
        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initialed = false
        this._triggerPercent()
      },
      progressClick(e) {
        let rect = this.$refs.progressBar.getBoundingClientRect()
        let offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        this._triggerPercent()
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - BTN_WIDTH
        const precent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', precent)
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initialed) {
          const barWidth = this.$refs.progressBar.clientWidth - BTN_WIDTH
          const offsetWidth = barWidth * newPercent
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
