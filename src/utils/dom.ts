// @ts-nocheck

/**
 * matches selector to parent element
 * @param el
 * @param selector
 * @returns
 */
export function matchesSelectorToParentElement(el: HTMLElement, selector: string): boolean {
  const p = Element.prototype
  const f =
    p.matches ||
    p.webkitMatchesSelector ||
    p.mozMatchesSelector ||
    p.msMatchesSelector ||
    p.oMatchesSelector ||
    function (s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1
    }
  return f.call(el, selector)
}
