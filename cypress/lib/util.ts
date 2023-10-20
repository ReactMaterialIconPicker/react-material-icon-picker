import { StyleObject } from '../../src/lib/types';

export const verifyComputedStyle = (
  selector: string,
  expectedStyles: StyleObject,
  exceptions?: Record<string, string[]>,
  exemptions?: string[]
) => {
  cy.get(selector).then((elements: JQuery<HTMLElement>) => {
    for (const [key, val] of Object.entries(expectedStyles)) {
      if(exemptions?.includes(key)) continue;
      const styleKey = key
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase();
      expect(elements[0].style[styleKey as any].trim()).to.be.oneOf([
        ...(exceptions?.[key] || []),
        val,
      ]);
    }
  });
};
