import { newE2EPage } from '@stencil/core/testing';

describe('dc-election-gallery', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dc-election-gallery></dc-election-gallery>');

    const element = await page.find('dc-election-gallery');
    expect(element).toHaveClass('hydrated');
  });
});
