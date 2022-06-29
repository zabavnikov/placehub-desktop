<template>
  <div>
    <TheHeader></TheHeader>
    <div class="flex flex-col min-h-screen mx-auto layout-container">
      <div class="layout">
<!--        <nav class="layout-nav">
          123
        </nav>-->
        <main class="layout-main">
          <section v-if="hasHeroSlot" class="my-4">
            <slot name="hero"/>
          </section>

          <div v-if="hasHeaderSlot" class="mt-4 mb-4">
            <h1 class="font-bold uppercase">
              <slot name="header"/>
            </h1>
          </div>

          <!--        <div v-if="$auth.loggedIn && $auth.user.email_verified_at === null" class="p-4 mt-4 bg-red-200">
                    На вашу электронную почту мы отправили письмо. Пожалуйста подтвердите, что электронная почта Ваша. Спасибо.
                  </div>-->

          <div :class="{
          'flex min-h-full layout-not-revers': true,
          // [this.reverse ? 'layout-revers' : 'layout-not-revers']: true
          }">
            <div class="layout-sidebar">
              <slot name="sidebar-before"/>
              <slot name="sidebar"/>
              <slot name="sidebar-after"/>
            </div>
            <div class="layout-content">
              <slot name="content-before"/>
              <slot/>
              <slot name="content-after"/>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/layout/TheHeader'

export default {
  components: {
    TheHeader
  },

  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasHeroSlot() {
      return !!this.$slots['hero'];
    },
    hasHeaderSlot() {
      return !!this.$slots['header'];
    },
    hasSidebarSlot() {
      return !!this.$slots['sidebar-before'] || !!this.$slots['sidebar'] || !!this.$slots['sidebar-after'];
    }
  }
}
</script>

<style lang="scss">
$nav-width: 200px;
$content-width: 560px;
$sidebar-width: 280px;
$column-gap: 40px;

.layout-container {
  width: $content-width + $sidebar-width;
}

.layout {
  display: flex;
  flex: 1;
}

.layout-nav {
  width: $nav-width;
}

.layout-main {
  width: $content-width + $sidebar-width;
}

.layout-content {
  width: $content-width;
  flex: 1;
  border-left: 1px solid #f5f5f5;
  border-right: 1px solid #f5f5f5;
}

.layout-sidebar {
  width: $sidebar-width;
  flex-shrink: 0;

  /*+ .layout-content {
    margin-right: $column-gap;
  }*/
}

.layout-not-revers {
  flex-direction: row-reverse;

  /*.layout-sidebar + .layout-content {
    margin-right: $column-gap;
  }*/
}

.layout-revers {
  /*.layout-sidebar {
    margin-right: $column-gap;
  }*/
}
</style>
