<template>
  <b-container fluid class="template-body">
    <introduction-1
      :key="Date.now()"
      :language.sync="self_language"
      :item.sync="item">
    </introduction-1>

    <text-grid
      type="education"
      :language.sync="self_language"
      :items.sync="item.education">
    </text-grid>

    <text-grid
      type="cert_lang"
      :language.sync="self_language"
      :items.sync="item.cert_lang">
    </text-grid>

    <text-grid
      type="activity"
      :language.sync="self_language"
      :items.sync="item.activity">
    </text-grid>

    <text-grid
      type="career_history"
      :language.sync="self_language"
      :items.sync="item.career_history">
    </text-grid>

    <timeline
      type="experience"
      :language.sync="self_language"
      :items.sync="item.experience">
    </timeline>

    <div v-if="!isPreview" id="leftSidenav" class="sidenav">
      <a v-if="self_language !== 'english'" tabindex="-1" href="javascript:void(0)" id="lang-en" @click="changeLang('english')">
        <b-button variant="none" tabindex="-1">English</b-button>
      </a>
      <a v-if="self_language !== 'korean'" tabindex="-1" href="javascript:void(0)" id="lang-kr" @click="changeLang('korean')">
        <b-button variant="none" tabindex="-1">Korean</b-button>
      </a>
      <a v-if="self_language !== 'japanese'" tabindex="-1" href="javascript:void(0)" id="lang-jp" @click="changeLang('japanese')">
        <b-button variant="none" tabindex="-1">Japanese</b-button>
      </a>
      <a href="javascript:void(0)" tabindex="-1" id="export" @click="exportToJSON">
        <b-button variant="none" tabindex="-1">Export to JSON</b-button>
      </a>
    </div>
    <a id="downloadAnchorElem" style="display:none"></a>

  </b-container>
</template>

<script>
import Introduction1 from '@/components/introduction/Introduction1.vue'
import TextGrid from '@/components/grid/TextGrid.vue'
import Timeline from '@/components/timeline/Timeline.vue'

export default {
  name: 'Template1',
  components: {
    'introduction-1': Introduction1,
    'text-grid': TextGrid,
    'timeline': Timeline
  },
  data () {
    return {
      defaultItem: {
        githubs: [],
        linkedins: [],
        homepages: [],
        self_introduce: [
          { key: Date.now(), value: null }
        ],
        education: [],
        cert_lang: [],
        activity: [],
        career_history: [],
        experience: []
      },
      self_language: this.$route.params.language ? this.$route.params.language : this.language
    }
  },
  computed: {
    item () {
      if (this.$route.params.item && typeof this.$route.params.item === 'object') {
        return this.$route.params.item
      }
      return this.importedItem ? this.importedItem : this.defaultItem
    }
  },
  props: {
    'importedItem': {
      default: null
    },
    'language': {
      type: String,
      default: 'english'
    },
    'isPreview': {
      type: Boolean,
      defautl: false
    }
  },
  methods: {
    exportToJSON (e) {
      let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.item))
      let dlAnchorElem = document.getElementById('downloadAnchorElem')
      dlAnchorElem.setAttribute('href', dataStr)
      dlAnchorElem.setAttribute('download', 'template1.json')
      dlAnchorElem.click()
    },
    changeLang (targetLanguage) {
      this.$emit('update:language', targetLanguage)
      this.self_language = targetLanguage
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin hover-sidenav-button {
    color: white;
    font-weight: 900;
    border-width: inherit;
    width: -webkit-fill-available;
  }
  /* Style the links inside the sidenav */
  #leftSidenav {
    a {
      position: fixed; /* Position them relative to the browser window */
      left: -120px; /* Position them outside of the screen */
      transition: all 0.3s; /* Add transition on hover */
      padding: 15px; /* 15px padding */
      width: 130px; /* Set a specific width */
      text-decoration: none; /* Remove underline */
      font-size: 20px; /* Increase font size */
      color: white; /* White text color */
      border-radius: 0 5px 5px 0; /* Rounded corners on the top right and bottom right side */

    &:hover {
      left: 0; /* On mouse-over, make the elements appear as they should */
    }
  }
  /* The about link: 20px from the top with a green background */
  #export {
    top: 30%;
    background-color: #4CAF50;
    > button {
      font-size: 1.5rem;
      @include hover-sidenav-button;
    }
  }
  #lang-en {
    top: 42%;
    background-color: #3b5998; /* Facebook-like */
    > button {
      font-size: 1.8rem;
      @include hover-sidenav-button;
    }
  }
  #lang-kr {
    top: 51.5%;
    background-color: #00aced; /* Twitter-like */
    > button {
      font-size: 1.8rem;
      @include hover-sidenav-button;
    }
  }
  #lang-jp {
    top: 61%;
    background-color: #007bb5; /* LinkedIn-like */
    > button {
      font-size: 1.8rem;
      @include hover-sidenav-button;
    }
  }
}
</style>
