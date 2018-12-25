import React from 'react';

const customCache = {};

export function create(scriptUrl) {
  if (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function' &&
    typeof scriptUrl === 'string' &&
    scriptUrl.length &&
    !customCache.hasOwnProperty(scriptUrl)
  ) {
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    customCache[scriptUrl] = true;
    document.body.appendChild(script);
  }

  const Iconfont = props => {
    const { type, children, ...restProps } = props;

    // component > children > type
    let content = null;
    if (props.type) {
      content = <use xlinkHref={`#${type}`} />;
    }
    if (children) {
      content = children;
    }
    return (
      <i className="lay-editor-icon">
        <svg aria-hidden="true" {...restProps}>
          {content}
        </svg>
      </i>
    );
  };

  Iconfont.displayName = 'Iconfont';

  return Iconfont;
}
