export const isClickedInsideRelatingElements = (target: HTMLElement, ...elements: HTMLElement[]): boolean => {
  let targetEl = target;

  do {
    if(elements.some(element => element === targetEl)) {
      return true;
    }

    // Go up the DOM
    targetEl = (targetEl as HTMLDivElement).parentNode as HTMLElement;
  } while (targetEl);

  return false;
}

