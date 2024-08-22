// ipad 第九代

import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useResponsive() {
  const width = ref(window.innerWidth)

  // 如果視窗改變，更新寬度
  function onResize() {
    width.value = window.innerWidth;
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  // 初始 breakpoints
  const breakpoints = {
    sm: 840,
    lg: 1920
  }
  // const breakpoints = {
  //   sm: 640,
  //   md: 768,
  //   lg: 1024,
  //   xl: 1280
  // };

  //計算 breakpoint 
  // const isSmall = computed(() => width.value < breakpoints.sm)
  // const isMedium = computed(() => width.value >= breakpoints.sm && width.value < breakpoints.md)
  // const isLarge = computed(() => width.value >= breakpoints.md && width.value < breakpoints.lg)
  // const isExtraLarge = computed(() => width.value >= breakpoints.lg)

  const isMobile = computed(() => width.value < breakpoints.sm)
  const isDesktop = computed(() => width.value >= breakpoints.sm && width.value <= breakpoints.lg)
  const isLarge = computed(() => width.value > breakpoints.lg)

  // 返回對應值給頁面使用
  return { isMobile, isDesktop, isLarge }
  // return { isSmall, isMedium, isLarge, isExtraLarge }
}