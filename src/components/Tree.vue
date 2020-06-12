<template>
  <div>
    <ul :key="item.key" v-for="item in items" class="wrapper">
      <b-button variant="outline-danger ml-2" tabIndex="-1" @mousedown.prevent="'false'" @click.prevent="remove(item)">-</b-button>
      <b-button variant="outline-primary ml-2" tabIndex="-1" @mousedown.prevent="'false'" @click.prevent="addChild(item)">→</b-button>
      <b-button variant="outline-primary" tabIndex="-1" @mousedown.prevent="'false'" @click.prevent="addSibling()">↓</b-button>

      <!-- $root.moveCursorToEnd -->
      <li
        contenteditable="true"
        @focus="handleFocus($event)"
        @blur="$set(item, 'node.value', $event.currentTarget.innerText) && handleBlur($event)">
        {{ getNodeValue(item.node) }}
      </li>
      <ul>
        <Tree :items.sync="item.nodes" :level="(level + 1)"></Tree>
      </ul>
    </ul>
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue'

export default {
  name: 'Tree',
  components: {
    'Tree': Tree
  },
  props: {
    items: {
      type: Array
    },
    level: {
      type: Number,
      default: 1
    }
  },
  mounted () {
  },
  methods: {
    getNodeValue (node) {
      let ret
      if (node && node.value) {
        ret = node.value
      } else {
        ret = 'detail'
        for (let i = 1; i <= this.level; i++) {
          ret += ('-' + i)
        }
      }
      return ret
    },
    addSibling () {
      this.items.push({
        node: { key: Date.now(), value: '' },
        nodes: []
      })
    },
    addChild (item) {
      item.nodes.push({ node: '', nodes: [] })
    },
    remove (item) {
      this.items.splice(this.items.indexOf(item), 1)
    },
    handleFocus (e) {
      $(e.currentTarget).parent().addClass('activated')
      $(e.currentTarget).closest('.tl-item').addClass('activated')
    },
    handleBlur (e) {
      $(e.currentTarget).parent().removeClass('activated')
      $(e.currentTarget).closest('.tl-item').removeClass('activated')
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin transition-opacity {
    visibility: hidden;
    opacity: 0;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    -ms-transition: all .5s ease;
    transition: all .5s ease;
  }

  ul {
    & > button {
      float: right;
      width: 2.5rem;
      line-height: 1.8rem;
      @include transition-opacity;
    }
    &.activated {
      & > button {
        visibility: visible;
        opacity: 1;
      }
    }
    li {
      padding: 0 .25rem 0 .25rem;
    }
  }
</style>
