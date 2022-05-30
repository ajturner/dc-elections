import { newSpecPage } from '@stencil/core/testing';
import { DcElectionCandidate } from '../dc-election-candidate';

describe('dc-election-candidate', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DcElectionCandidate],
      html: `<dc-election-candidate></dc-election-candidate>`,
    });
    expect(page.root).toEqualHtml(`
      <dc-election-candidate>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dc-election-candidate>
    `);
  });
});
