import { newSpecPage } from '@stencil/core/testing';
import { DcElectionSurvey } from '../dc-election-survey';

describe('dc-election-survey', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DcElectionSurvey],
      html: `<dc-election-survey></dc-election-survey>`,
    });
    expect(page.root).toEqualHtml(`
      <dc-election-survey>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dc-election-survey>
    `);
  });
});
