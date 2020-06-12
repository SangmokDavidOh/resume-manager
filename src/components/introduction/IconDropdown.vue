<template>
  <div class="icon-dropdown">
    <b-button variant="outline-light" tabindex="-1">+</b-button>
    <ul>
      <b-button variant="outline-light" tabindex="-1" @click.prevent="addGithub">
        <font-awesome-icon :icon="['fab', 'github']" />
      </b-button>
      <b-button variant="outline-light" tabindex="-1" @click.prevent="addLinkedin">
        <font-awesome-icon :icon="['fab', 'linkedin']" />
      </b-button>
      <b-button variant="outline-light" tabindex="-1" @click.prevent="addHomepage">
        <font-awesome-icon :icon="['fas', 'home']" />
      </b-button>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IconDropdown',
  data () {
    return {}
  },
  props: ['item'],
  methods: {
    addGithub (e) {
      this.item.githubs.push({ key: Date.now(), href: '' })
    },
    addLinkedin (e) {
      this.item.linkedins.push({ key: Date.now(), href: '' })
    },
    addHomepage (e) {
      this.item.homepages.push({ key: Date.now(), title: '', href: '' })
    }
  }
}
</script>

<style lang="scss" scoped>
  // Variables
  $btn-clr: #fcba03;
  $btn-radius: 30px;

  // Icon List
  $icons: 'bars user cogs paper-plane pie-chart';

  * {
    margin: 0;
    padding: 0;
  }

  // Button
  button {
    border: none;
    border-image-width: 0;
  }
  .icon-dropdown {
    background: white;
    border-radius: 50%;
    width: $btn-radius;
    height: $btn-radius;

    & > button {
      width: $btn-radius;
      height: $btn-radius;
      background: $btn-clr;
      color: whitesmoke;
      border-radius: 50%;
      font-size: 2rem;
      font-weight: 800;
    }
    & > ul {
      height: 0;
      > button {
        transition: all .4s ease-in-out;
        height: 0;
        width: $btn-radius;
        background: $btn-clr;
        color: whitesmoke;
        border-radius: 50%;
      }
    }
    &:hover {
      & > ul {
        height: 300px;
        > button {
          transition: all .4s ease-in-out;
          height: $btn-radius;
          padding: 5px;
          margin-top: .5rem;
        }
      }
    }
  }
  // Icon Loop
  @each $icon in $icons {
    .fa-#{$icon} {
      padding: 23px 0;
      width: 80px;
      &:before {
        padding: 23px 25px;
        border-bottom: 1px solid lighten($btn-clr, 10%);
      }
    }
    // Icon Font Size
    .fa {
      &:before {
        font-size: 31px;
      }
    }
  }
  @media print {
    .icon-dropdown {
      display: none;
    }
  }

</style>
