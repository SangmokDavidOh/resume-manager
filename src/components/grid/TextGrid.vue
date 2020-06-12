<template>
  <div :id="gridId" class="textgrid-body">
    <div class="title">
      <span>{{gridLabel}}</span>
      <div class="col"></div>
      <b-button variant="outline-primary" tabindex="-1" @mousedown.prevent="'false'" @click.prevent="addItem">+</b-button>
      <b-button variant="outline-danger ml-2" tabindex="-1" @mousedown.prevent="'false'" @click.prevent="removeItem($event)">-</b-button>
    </div>
    <hr>
    <b-row class="no-gutters content" :key="item.key" v-for="item in items">
      <b-col cols="5"
        :contenteditable="[item.column1 ? true : false]"
        @input="$set(item, columnProps.column1, $event.currentTarget.innerText)"
        @focus="focusHandler($event, item)"
        @blur="blurHandler($event)">
        {{ item.column1 ? item.column1 : columnProps.column1 }}
      </b-col>
      <b-col cols="5"
        :contenteditable="[item.column2 ? true : false]"
        @input="$set(item, columnProps.column1, $event.currentTarget.innerText)"
        @focus="focusHandler($event, item)"
        @blur="blurHandler($event)">
        {{ item.column2 ? item.column2 : columnProps.column2 }}
      </b-col>
      <b-col cols="" class="text-right"
        :contenteditable="[item.column3 ? true : false]"
        @input="$set(item, columnProps.column1, $event.currentTarget.innerText)"
        @focus="focusHandler($event, item)"
        @blur="blurHandler($event)">
        {{ item.column3 ? item.column3 : columnProps.column3 }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { GridRow } from '@/util/beans.js'
import CONSTANT from '@/util/constant.js'

export default {
  name: 'TextGrid',
  data () {
    return {
      selectedItem: null
    }
  },
  computed: {
    gridId () {
      return CONSTANT['GRID_' + this.type.toUpperCase()][this.language].id
    },
    gridLabel () {
      return CONSTANT['GRID_' + this.type.toUpperCase()][this.language].label
    },
    columnProps () {
      return CONSTANT['GRID_' + this.type.toUpperCase()][this.language].columnProps
    }
  },
  props: {
    'type': {
      type: String,
      default: 'education'
    },
    'language': {
      type: String,
      default: 'english'
    },
    'items': {
      type: Array,
      default: () => { return [] }
    }
  },
  methods: {
    addItem (e) {
      let copied = JSON.parse(JSON.stringify(this.items))
      copied.push(new GridRow())
      this.$emit('update:items', copied)
    },
    removeItem (e) {
      if (this.selectedItem) {
        let copied = JSON.parse(JSON.stringify(this.items))
        copied.splice(copied.indexOf(this.selectedItem), 1)
        this.$emit('update:items', copied)
      }
    },
    focusHandler (e, selected) {
      $(e.currentTarget).parent().addClass('activated')
      $('#' + this.gridId + ' div.title').addClass('activated')
      this.selectedItem = selected
    },
    blurHandler (e) {
      $(e.currentTarget).parent().removeClass('activated')
      $('#' + this.gridId + ' div.title').removeClass('activated')
      this.selectedItem = null
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin transition-opacity {
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity .3s ease;
  -moz-transition: opacity .3s ease;
  -o-transition: opacity .3s ease;
  -ms-transition: opacity .3s ease;
  transition: opacity .3s ease;
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

.textgrid-body{
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
  .content {
    display: flex;
    font-size: 1.6rem;
    line-height: 3rem;
  }
  .content.activated {
    @include bgcolor-on-hover;
  }
}
</style>
