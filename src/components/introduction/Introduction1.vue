<template>
  <div id="introduction" class="introduction-wrapper">
    <div class="profile">
      <div class="col-auto">
        <b-img v-bind="mainProps" rounded="circle" alt="profile_avatar"
        src="static/profile_osm_2.jpg"></b-img>
      </div>
      <div class="col-auto">
        <div id="full-name"
          :contenteditable="[item.full_name ? true : false]"
          @blur="$set(item, 'full_name', $event.currentTarget.innerText)">
          {{ item.full_name ? item.full_name : defaultMessage('full_name') }}
        </div>
        <div id="position"
          :contenteditable="[item.position ? true : false]"
          @blur="$set(item, 'position', $event.currentTarget.innerText)">
          {{ item.position ? item.position : defaultMessage('position') }}
        </div>
      </div>
      <div class="col"></div>

      <icon-dropdown :item.sync="item"></icon-dropdown>

      <div id="personal-info" class="col-auto">
        <div class="address">
          <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
          <div
            :contenteditable="[item.current_address ? true : false]"
            @blur="$set(item, 'current_address', $event.currentTarget.innerText)">
            {{ item.current_address ? item.current_address : defaultMessage('current_address') }}
          </div>
        </div>
        <div class="phone">
          <font-awesome-icon :icon="['fas', 'mobile-alt']" />
          <div
            :contenteditable="[item.phone ? true : false]"
            @blur="$set(item, 'phone', $event.currentTarget.innerText)">
            {{ item.phone ? item.phone : defaultMessage('phone') }}
          </div>
        </div>
        <div class="email">
          <font-awesome-icon :icon="['fas', 'envelope']" />
          <div
            :contenteditable="[item.email ? true : false]"
            @blur="$set(item, 'email', $event.currentTarget.innerText)">
            {{ item.email ? item.email : defaultMessage('email') }}
          </div>
        </div>
        <div class="github">
          <div :key="github.key" v-for="github in item.githubs">
            <b-button variant="danger" tabindex="-1" @click.prevent="removeGithub(github)">-</b-button>
            <font-awesome-icon :icon="['fab', 'github']" />
            <div
              :contenteditable="[github.href ? true : false]"
              @focus="focusHandler('github', $event, github)"
              @blur="$set(github, 'href', $event.currentTarget.innerText) && blurHandler('github', $event)">
              {{ github.href ? github.href : defaultMessage('github') }}
            </div>
          </div>
        </div>
        <div class="linkedin">
          <div :key="linkedin.key" v-for="linkedin in item.linkedins">
            <b-button variant="danger" tabindex="-1" @click.prevent="removeLinkedin(linkedin)">-</b-button>
            <font-awesome-icon :icon="['fab', 'linkedin']" />
            <div
              :contenteditable="[linkedin.href ? true : false]"
              @focus="focusHandler('linkedin', $event, linkedin)"
              @blur="$set(linkedin, 'href', $event.currentTarget.innerText) && blurHandler('linkedin', $event)">
              {{ linkedin.href ? linkedin.href : defaultMessage('linkedin') }}
            </div>
          </div>
        </div>
        <div class="homepage">
          <div :key="homepage.key" v-for="homepage in item.homepages">
            <b-button variant="danger" tabindex="-1" @click.prevent="removeHomepage(homepage)">-</b-button>
            <font-awesome-icon :icon="['fas', 'home']" />
            <div
              :contenteditable="[homepage.title ? true : false]"
              @focus="focusHandler('homepage', $event, homepage)"
              @blur="$set(homepage, 'title', $event.currentTarget.innerText) && blurHandler('homepage', $event)">
              {{ homepage.title ? homepage.title : defaultMessage('homepage_title') }}
            </div>
            <span class="pl-1 pr-1"> - </span>
            <div
              :contenteditable="[homepage.href ? true : false]"
              @focus="focusHandler('homepage', $event, homepage)"
              @blur="$set(homepage, 'href', $event.currentTarget.innerText) && blurHandler('homepage', $event)">
              {{ homepage.href ? homepage.href : defaultMessage('homepage_address') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="self-intro">
      <p class="self-intro--btns">
        <b-button variant="outline-primary" tabindex="-1" @mousedown.prevent="'false'" @click.prevent="addSelfIntroduce">+</b-button>
        <b-button variant="outline-danger" tabindex="-1" @mousedown.prevent="'false'" @click.prevent="removeSelfIntroduce">-</b-button>
      </p>
      <p class="self-intro--line col"
        :key="line.key" v-for="line in item.self_introduce"
        :contenteditable="[line.value ? true : false]"
        @focus="focusHandler('selfIntro', $event, line)"
        @blur="$set(line, 'value', $event.currentTarget.innerText) && blurHandler('selfIntro', $event)">
        {{ line.value ? line.value : 'Enter your self introduce' }}
      </p>
    </div>
  </div>
</template>

<script>
import IconDropdown from '@/components/introduction/IconDropdown'
import CONSTANT from '@/util/constant.js'

const ItemType = {
  github: 'github',
  linkedin: 'linkedin',
  homepage: 'homepage',
  selfIntro: 'selfIntro'
}

export default {
  name: 'Introduction1',
  components: {
    'icon-dropdown': IconDropdown
  },
  data () {
    return {
      mainProps: { blank: false, blankColor: '#777', width: 200, height: 200, class: '' },
      selectedGithub: null,
      selectedLinkedIn: null,
      selectedHomepage: null,
      selectedSelfIntro: null
    }
  },
  props: {
    'item': {
      type: Object,
      default: () => { return {} }
    },
    'language': {
      type: String,
      default: 'english'
    }
  },
  computed: {
    defaultMessage () {
      return (inputField) => CONSTANT['DEFAULT_MESSAGE'][inputField][this.language]
    }
  },
  methods: {
    focusHandler (itemType, e, selected) {
      $(e.currentTarget).parent().addClass('activated')
      switch (itemType) {
        case ItemType.github:
          this.selectedGithub = selected
          break
        case ItemType.linkedin:
          this.selectedLinkedIn = selected
          break
        case ItemType.homepage:
          this.selectedHomepage = selected
          break
        case ItemType.selfIntro:
          this.selectedSelfIntro = selected
          break
        default:
          break
      }
    },
    blurHandler (itemType, e) {
      $(e.currentTarget).parent().removeClass('activated')
      switch (itemType) {
        case ItemType.github:
          this.selectedGithub = null
          break
        case ItemType.linkedin:
          this.selectedLinkedIn = null
          break
        case ItemType.homepage:
          this.selectedHomepage = null
          break
        case ItemType.selfIntro:
          this.selectedSelfIntro = null
          break
        default:
          break
      }
    },
    removeGithub (item) {
      this.item.githubs.splice(this.item.githubs.indexOf(item), 1)
    },
    removeLinkedin (item) {
      this.item.linkedins.splice(this.item.linkedins.indexOf(item), 1)
    },
    removeHomepage (item) {
      this.item.homepages.splice(this.item.homepages.indexOf(item), 1)
    },
    addSelfIntroduce (e) {
      this.item.self_introduce.push({ key: Date.now(), value: null })
    },
    removeSelfIntroduce (e) {
      if (this.selectedSelfIntro) {
        for (let idx in this.item.self_introduce) {
          if (this.selectedSelfIntro.key === this.item.self_introduce[idx].key) {
            this.item.self_introduce.splice(idx, 1)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color-introduction: #f5f2eb;
$color-light-blue: #9badcc;
$color-grey: #56637a;

@mixin transition-opacity {
    visibility: hidden;
    opacity: 0;
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    -ms-transition: all 1s ease;
    transition: all 1s ease;
  }

.introduction-wrapper {
  line-height: 1.5;
  background: $bg-color-introduction;

  .profile {
    display: flex;
    padding: 1rem 0 .25rem 0;
    width: 100%;

    #full-name {
      font-size: 3.5rem;
      font-weight: 600;
    }
    #position {
      font-size: 2.5rem;
      font-weight: 400;
    }
    #personal-info {
      line-height: 3rem;
      font-size: 1.6rem;
      padding-left: 2.5rem;
      color: $color-grey;

      svg {
        width: 3rem;
        height: 2.2rem;
        vertical-align: text-bottom;
      }
      .address, .phone, .email {
        display: flex;
        width: calc(100% + 30px);
        & > svg {
          margin: auto 0 auto 0;
        }
        & > div {
          width: 100%;
        }
      }
      .email {
        color: $color-light-blue;
      }
    }

    $types: github, linkedin, homepage;

    @each $type in $types {
      .#{$type} > div {
        display: flex;
        width: calc(100% + 30px);
        & > svg {
          margin: auto 0 auto 0;
        }
        transform: translateX(-26px);
        > button {
          margin: .5rem 0 .25rem .5rem;
          width: 2rem;
          vertical-align: text-bottom;
          @include transition-opacity;
        }
      }
      .#{$type} > div:hover, .#{$type} > div.activated {
        transform: translateX(0px);
        > button {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }

  $btn-size: 3rem;
  .self-intro {
    margin-top: 3rem;
    padding-bottom: 1rem;

    p {
      line-height: 2rem;
    }
    &:hover, &.activated > p > button {
      visibility: visible;
      opacity: 1;
    }
    &--btns {
      display: flex;
      justify-content: flex-end;
      margin: 0 0 .25rem auto;
    }
    &--btns > button {
      width: $btn-size;
      height: $btn-size;
      font-size: initial;
      margin-right: 0.25rem;
    }
    &--line {
      font-size: 1.6rem;
    }
  }
}

button {
  visibility: hidden;
  opacity: 0;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -o-transition: all .5s ease;
  -ms-transition: all .5s ease;
  transition: all .5s ease;
}

@media only screen and (min-height: 350px) {
  .introduction-wrapper {
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
      font-size: 1rem;
    }
  }
}
</style>
