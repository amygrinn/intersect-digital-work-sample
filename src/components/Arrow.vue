<template>
<div 
  id="arrow-container"
  @click="$emit('click')"
  :class="left ? 'left-arrow' : 'right-arrow'">

  <svg
    id="arrow-svg"
    viewBox="0 0 100 100"
    :style="left ? 'transform: rotate(180deg);': ''">
    <path
      stroke="black"
      d="M6,86 l40,-36 l-40-36">
      <animate
        attributeName="opacity"
        values=".6; .6; 1; .6; .6"
        dur="2.5s"
        repeatCount="indefinite"
        :begin="begin"
        keyTimes="0; .6; .7; .8; 1"/>
    </path>
    <path
      class="gray"
      d="M30,86 l40,-36 l-40-36">
      <animate
        attributeName="opacity"
        values="0; 0; 1; 0; 0"
        dur="2.5s"
        repeatCount="indefinite"
        :begin="begin"
        keyTimes="0; .7; .8; .9; 1"/>
    </path>
    <path
      class="gray"
      d="M54,86 l40,-36 l-40-36">
      <animate
        attributeName="opacity"
        values="0; 0; 1; 0"
        dur="2.5s"
        repeatCount="indefinite"
        :begin="begin"
        keyTimes="0; .8; .9; 1"/>
    </path>
  </svg>

  <p :style="`transform: translateX(${left ? '' : '-'}10px);`">
    <slot></slot>
  </p>

</div>
</template>

<style lang="scss" scoped>
#arrow-container {
  position: fixed;
  padding: 20px;
  top: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  z-index: 100;
}

p {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

svg {
  width: 50px;
  height: 50px;
}
path {
  stroke-width: 9;
  fill: none;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.left-arrow {
  left: 0;
}

.right-arrow {
  right: 0;
}

@media #{$phablet}, #{$phabletSide} {
  #arrow-container {
    top: 10%;
    display: flex;
    padding: 0;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  .left-arrow {
    flex-direction: row !important;
  }

  .right-arrow {
    flex-direction: row-reverse !important;
  }
}

.gray {
  stroke: rgba(0,0,0,.4);
}
</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    left: {
      default: false,
      type: Boolean,
    },
    right: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    begin(): string { return this.left ? '0s' : '1s'; },
  },
});
</script>
