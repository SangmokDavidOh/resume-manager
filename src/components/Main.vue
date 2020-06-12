<template>
  <main id="main-contents" class="container-fluid">
    <!-- Transition area -->
    <div :class="'transition ' + [start_flg ? 'active' : '']"></div>

    <!-- Title area -->
    <div class="title">
      <h1 class="title--title">My Resume Manager</h1>
      <a class="title--btn" href="#" @click.prevent="triggerTransition">Start Creating</a>
    </div>

    <!-- Language area -->
    <div class="language mt-3" :class="{ 'active': start_flg }">
      <b-form-select v-model="selectedLanguage" :options="optionsLanguage"></b-form-select>
    </div>

    <!-- Template area -->
    <div class="template mt-3" :class="{ 'active': show_template }">
      <b-form-select v-model="selectedTemplate" :options="optionsTemplate"></b-form-select>
    </div>

    <!-- Add or Import menu area -->
    <div class="menu row mt-3" :class="{ 'active': selectedTemplate }">
      <b-button variant="none" class="menu-new menu-btn col" @click.prevent="openSubsubMenuOrPreview">
        New
      </b-button>
      <b-button variant="none" class="menu-import menu-btn col" @click.prevent="openSubsubMenuOrPreview">
        Import
      </b-button>
    </div>

    <div class="submenu mt-3" :class="{ 'active': show_import }">
      <b-form-file
        :key="Date.now()"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it"
        drop-placeholder="Drop file here..."
        class="mt-1 mb-1"
        @input="validateFile">
      </b-form-file>
    </div>

    <div class="preview container-fluid" :class="{ 'active': show_preview || templateItem }">
      <div class="preview--wrapper">
        <router-link :to="{name: 'Template1', params: { item: this.templateItem, language: selectedLanguage }}">
          <component
            :is="selectedTemplate"
            :importedItem="getTemplateItem"
            :language="selectedLanguage"
            :isPreview="true"
          >
          </component>
          <div class="preview--wrapper--overlay"></div>
          <div class="preview--wrapper--details fadeInTop">
            <h3 v-if="show_preview || templateItem" class="title">This is a preview</h3>
            <p v-if="show_preview || templateItem" class="text">Click here to go to a template page</p>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import Template1 from '@/components/template/Template1.vue'

export default {
  name: 'Main',
  components: {
    'template-001': Template1
  },
  data () {
    return {
      selectedLanguage: null,
      selectedTemplate: null,
      optionsLanguage: [
        { value: null, text: 'Please select your language' },
        { text: 'English', value: 'english' },
        { text: '한국어', value: 'korean' },
        { text: '日本語', value: 'japanese' }
      ],
      optionsTemplate: [
        { value: null, text: 'Please select an template' },
        { text: 'Template A', value: 'template-001' }
      ],
      start_flg: false,
      show_template: false,
      show_import: false,
      show_preview: false,
      file: null,
      templateItem: null
    }
  },
  watch: {
    start_flg (newVal, oldVal) {
      if (!newVal) {
        this.selectedTemplate = null
      }
    },
    selectedLanguage (newVal, oldVal) {
      if (newVal) {
        this.show_template = true
      } else {
        this.show_template = false
        this.selectedTemplate = null
      }
    },
    selectedTemplate (newVal, oldVal) {
      if (!newVal) {
        this.show_preview = false
        this.show_preview = false
        this.show_import = false
        this.templateItem = false
      }
    }
  },
  computed: {
    getTemplateItem () {
      if (this.show_preview) {
        return this.show_preview
      } else if (this.templateItem) {
        return this.templateItem
      }
    }
  },
  methods: {
    triggerTransition (e) {
      this.start_flg = !this.start_flg
      this.show_import = false
      this.show_preview = false
      this.templateItem = null
    },
    openSubsubMenuOrPreview (e) {
      let target = e.currentTarget.innerText
      let currentTarget = this.show_preview ? 'New' : null || this.show_import ? 'Import' : null
      if (currentTarget) {
        this.show_preview = false
        this.show_import = false
        this.templateItem = null

        let _self = this
        setTimeout(() => {
          if (currentTarget !== target) {
            _self.switchMenu(target)
          }
        }, 1000)
      } else {
        this.switchMenu(target)
      }
    },
    switchMenu (target) {
      switch (target) {
        case 'New':
          this.show_preview = true
          this.templateItem = true
          break
        case 'Import':
          this.show_import = true
          break
        default:
          break
      }
    },
    async validateFile (e) {
      let jsonStr = await this.file.text()
      this.templateItem = JSON.parse(jsonStr)
    }
  }
}
</script>

<style lang="scss" scoped>
*, *:before, *:after{
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing:border-box;
  box-sizing: border-box;
}
main {
  background-color: #4089a6;
}
@mixin transition-height {
  -webkit-transition: height 1s ease-out;
  -moz-transition: height 1s ease-out;
  -o-transition: height 1s ease-out;
  -ms-transition: height 1s ease-out;
  transition: height 1s ease-out;
}
@mixin transtion-maxheight {
  -webkit-transition: max-height 1s ease-in;
  -moz-transition: max-height 1s ease-in;
  -o-transition: max-height 1s ease-in;
  -ms-transition: max-height 1s ease-in;
  transition: max-height 1s ease-in;
}

#main-contents {
  // background-image: -webkit-linear-gradient(top, #4089a6, rgba(64, 137, 166, 0));
  // background-image: linear-gradient(to bottom,#4089a6, rgba(64, 137, 166, 0));
  height: 100vh;
  padding: 0 1rem 0 1rem;

  .transition {
    @include transition-height;
    &.active {
      height: 2%;
    }

    overflow: auto;
    height: 30%;
  }
  .title {
    overflow: auto;
    text-align: center;

    &--title {
      color: #ffffff;
      font-size: 3.2rem;
    }
    &--btn {
      display: inline-block;
      padding: 0.8em 1em;
      margin: 1em 0 1em 0;
      border-radius: 50em;
      background-color: #283040;
      color: #ffffff;
      font-weight: bold;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-decoration: none;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        background-color: #323c50;
      }
    }
  }
  .template, .language {
    @include transtion-maxheight;
    &.active {
      max-height: 15%;
    }

    overflow: auto;
    height: auto;
    max-height: 0;
    background: whitesmoke;
    > select {
      font-size: 1.5rem;
      padding: 0.5rem;
    }
  }
  .menu {
    @include transtion-maxheight;
    &.active {
      max-height: 15%;
    }

    overflow: auto;
    height: auto;
    max-height: 0;
    &-btn {
      margin: 0 0.25rem 0 0.25rem;
      border: 0.25rem solid white;
      font-size: 2rem;
      color: white;
      align-self: center;
    }
  }
  .submenu {
    @include transtion-maxheight;
    font-size: 1.5rem;
    &.active {
      max-height: 15%;
    }

    overflow: hidden;
    height: auto;
    max-height: 0;
  }

  .preview {
    @include transtion-maxheight;
    &.active {
      max-height: 80%;
    }

    overflow: auto;
    height: auto;
    max-height: 0;
    background: whitesmoke;
  }
}
/* --------------------------------
Overlay - Hover
-------------------------------- */
.preview--wrapper {
  position: relative;
  margin: auto;
  overflow: hidden;

  &--overlay {
    background: rgba(0,0,0,0.7);
    position: absolute;
    height: 99%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    -webkit-transition: all 0.4s ease-out 0s;
    -moz-transition: all 0.4s ease-out 0s;
    transition: all 0.4s ease-out 0s;
  }
  &:hover &--overlay {
    opacity: 1;
  }
  &--details {
    position: absolute;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    top: 50%;
    left: 50%;
    opacity: 0;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: all 0.3s ease-out 0s;
    -moz-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s;

    &.fadeInTop{
      top: 0;
      & h3 {
        color: #fff;
        font-weight: 500;
        letter-spacing: 0.15em;
        margin-bottom: 0.5em;
        text-transform: uppercase;
      }
      & p {
        color: #fff;
        font-size: 0.8em;
      }
    }
  }
  &:hover &--details {
    top: 30%;
    left: 50%;
    opacity: 1;
  }
}

@media only screen and (max-height: 400px) {
  #introduction {
    line-height: 1.5;

    img {
      width: 75px;
      height: 75px;
    }
    #full-name {
      font-size: 1.2rem;
      font-weight: 600;
    }
    #position {
      font-size: 1rem;
      font-weight: 400;
    }
    #personal-info {
      display: inline-block;
      font-size: 0.5rem;
    }
  }
  .title {
    &--title {
      padding: 0.5em 0.7em;
    }
    &--btn {
      margin-bottom: 0.5em;
    }
  }
  .template-active {
    height: 12%;
    button {
      padding: 0.3em !important;
    }
    div.menu {
      padding: 0.2em !important;
      font-size: small;
    }
  }
  .title {
    &--title {
      font-size: 2.2rem;
    }
    &--btn {
      font-size: 0.8rem;
    }
  }
}

</style>
