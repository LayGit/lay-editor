import React, { Component } from 'react';
import PropTypes from 'prop-types';

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback,
  );
}

function getLinkComponent(config) {
  return class Link extends Component {
    static propTypes = {
      entityKey: PropTypes.string.isRequired,
      children: PropTypes.array,
      contentState: PropTypes.object,
    }

    render() {
      const { children, entityKey, contentState } = this.props
      const { url, targetOption } = contentState.getEntity(entityKey).getData()
      return (
        <span className="lay-editor-link-wrapper">
          <a href={url} target={targetOption}>{children}</a>
        </span>
      );
    }
  };
}

export default config => ({
  strategy: findLinkEntities,
  component: getLinkComponent(config),
});
