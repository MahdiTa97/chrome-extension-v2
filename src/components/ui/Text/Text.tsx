import cn from 'classnames';
import React, {
  CSSProperties,
  FunctionComponent,
  JSXElementConstructor,
} from 'react';
import './text.css';
import { translator as t } from '../../../lib/utils';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
  isTranslationDisabled?: boolean;
}

type ComponentType =
  | JSXElementConstructor<any>
  | React.ReactElement<any>
  | React.ComponentType<any>
  | string;

type Variant = 'p' | 'h2' | 'h1' | 'h3';

const Text: FunctionComponent<Props> = ({
  style,
  className = '',
  variant = 'p',
  children,
  html,
  isTranslationDisabled = false,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
  };

  const Component: ComponentType = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  const rootClassName = cn(className);

  return (
    <Component className={rootClassName} style={style} {...htmlContentProps}>
      {isTranslationDisabled ? children : t(children)}
    </Component>
  );
};

export default Text;
