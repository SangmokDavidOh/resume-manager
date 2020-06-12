<template>
  <div :id="timelineId" class="timeline-body">
    <div class="title">
      <span>{{timelineLabel}}</span>
      <div class="col"></div>
      <b-button variant="outline-primary" tabindex="-1" @mousedown.prevent="'false'" @click.prevent="addExperience">+</b-button>
      <b-button variant="outline-danger ml-2" tabindex="-1" @mousedown.prevent="'false'" @click.prevent="removeExperience($event)">-</b-button>
    </div>
    <hr>
    <div class="history-tl-container">
      <ul class="tl">
        <li class="tl-item" :key="exp.key" v-for="exp in items">
          <div class="tl-item--timestamp" contenteditable="true"
            @focus="focusHandler($event, exp)"
            @blur="$set(exp, 'period', $event.currentTarget.innerText) && blurHandler($event)">
            {{exp.period}}
          </div>
          <div class="tl-item--title" contenteditable="true"
            @focus="focusHandler($event, exp)"
            @blur="$set(exp, 'title', $event.currentTarget.innerText) && blurHandler($event)">
            {{exp.title}}
          </div>
          <div class="tl-item--detail">
            <tree :items.sync="exp.detail"></tree>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue'
import CONSTANT from '@/util/constant.js'

export default {
  name: 'Timeline',
  components: {
    'tree': Tree
  },
  data () {
    return {
      selectedExp: null
    }
  },
  computed: {
    timelineId () {
      return CONSTANT['TIMELINE_' + this.type.toUpperCase()][this.language].id
    },
    timelineLabel () {
      return CONSTANT['TIMELINE_' + this.type.toUpperCase()][this.language].label
    }
  },
  props: ['type', 'language', 'items'],
  methods: {
    focusHandler (e, selected) {
      $(e.currentTarget).parent().addClass('activated')
      $('#' + this.timelineId + ' div.title').addClass('activated')
      this.selectedExp = selected
    },
    blurHandler (e) {
      $(e.currentTarget).parent().removeClass('activated')
      $('#' + this.timelineId + ' div.title').removeClass('activated')
      this.selectedExp = null
    },
    addExperience () {
      let copied = JSON.parse(JSON.stringify(this.items))
      copied.push({
        key: Date.now(),
        period: 'From - To',
        title: 'Title',
        detail: [
          {
            node: { key: Date.now(), value: '' },
            nodes: []
          }
        ]
      })
      this.$emit('update:items', copied)
    },
    removeExperience () {
      if (this.selectedExp) {
        let copied = JSON.parse(JSON.stringify(this.items))
        copied.splice(copied.indexOf(this.selectedExp), 1)
        this.$emit('update:items', copied)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin transition-opacity{
  visibility: hidden;
  opacity: 0;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -o-transition: all .5s ease;
  -ms-transition: all .5s ease;
  transition: all .5s ease;
}
@mixin bgcolor-on-hover {
  background-color: #eef7fa;
  transition-duration: 0.5s;
  box-shadow:
    -2px -2px 5px rgba(255,255,255,1),
    3px 3px 5px rgba(0,0,0,0.1);
  color: #6a9bd8;
}
$title-font-size: 2.5rem;

.timeline-body {
  padding: 6rem 0 0 0;

  .title {
    display: flex;
    font-size: $title-font-size;
    font-weight: 500;
    button {
      width: $title-font-size;
      height: $title-font-size;
      align-self: center;
      @include transition-opacity;
    }
  }
  .title:hover, .title.activated {
    > button {
      visibility: visible;
      opacity: 1;
    }
  }
}

.history-tl-container{
  width: 100%;
  display:block;
  position:relative;

  .tl {
    margin:20px 0;
    padding:0;
    display:inline-block;
    width: 100%;

    .tl-item {
      list-style: none;
      margin: auto;
      margin-left: 17%;
      min-height: 50px;
      border-left: 1px dashed #86D6FF;
      padding: 0 0 20px 30px;
      position: relative;
      line-height: 3rem;
      &.activated {
        @include bgcolor-on-hover;
      }
      &:last-child {
        border-left: 0;
      }
      &::before {
        position: absolute;
        left: -13px;
        content: " ";
        border: solid rgba(255, 255, 255, 0.74);
        border-radius: 500%;
        background: #258CC7;
        height: 25px;
        width: 25px;
        transition: all 500ms ease-in-out;
      }
      &:hover::before {
        border-color: #258CC7;
        transition: all 1000ms ease-in-out;
      }
      &--timestamp {
        padding: 0 .25rem 0 .25rem;
        position: absolute;
        width: 160px;
        left: -20%;
        font-size: 1.8rem;
        font-weight: 600;
      }
      &--title {
        padding: 0 .25rem 0 .25rem;
        font-size: 1.8rem;
        font-weight: 600;
      }
      &--detail {
        font-size: 1.6rem;
        color:rgba(0,0,0,0.5);
      }
    }
  }
}
</style>
