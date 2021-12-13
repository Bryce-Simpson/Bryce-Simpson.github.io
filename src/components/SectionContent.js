import React from 'react';
import _ from 'lodash';

import { withPrefix, markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionContent extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const image = _.get(section, 'image');
        const imageAlt = _.get(section, 'image_alt', '');
        const content = _.get(section, 'content');
        const actions = _.get(section, 'actions');

        return (
            <section id={sectionId} className="block block-text">
                {title && <h2 className="block-title underline inner-sm">{title}</h2>}
                {image && (
                    <div className="block-image">
                        <img src={withPrefix(image)} alt={imageAlt} />
                    </div>
                )}
                <script src="https://tryhackme.com/badge/710918"></script>
                {content && <div className="block-content inner-sm">{markdownify(content)}</div>}
                {!_.isEmpty(actions) && (
                    <div className="block-buttons inner-sm">
                        <CtaButtons actions={actions} />
                    </div>
                )}
            </section>
        );
    }
}
