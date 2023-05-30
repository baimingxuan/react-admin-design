// Extract tree specified structure
export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
  return treeData.map(item => treeMapEach(item, opt))
}

// Extract tree specified structure
export function treeMapEach(
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn },
) {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0 && !data.meta.hideChildrenInMenu
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((index: number) =>
        treeMapEach(index, {
          children,
          conversion
        })
      )
    }
  } else {
    return {
      ...conversionData
    }
  }
}
