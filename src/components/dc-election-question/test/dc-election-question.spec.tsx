import { newSpecPage } from '@stencil/core/testing';
import { DcElectionQuestion } from '../dc-election-question';

describe('dc-election-question', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DcElectionQuestion],
      html: `<dc-election-question></dc-election-question>`,
    });
    expect(page.root).toEqualHtml(`
      <dc-election-question>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dc-election-question>
    `);
  });
});
