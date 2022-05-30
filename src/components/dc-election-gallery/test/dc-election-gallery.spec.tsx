import { newSpecPage } from '@stencil/core/testing';
import { DcElectionGallery } from '../dc-election-gallery';

describe('dc-election-gallery', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DcElectionGallery],
      html: `<dc-election-gallery></dc-election-gallery>`,
    });
    expect(page.root).toEqualHtml(`
      <dc-election-gallery>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dc-election-gallery>
    `);
  });
});
