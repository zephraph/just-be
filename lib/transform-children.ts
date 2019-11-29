import React from "react";

interface decorateArgs {
  children: React.ReactChildren;
  filter?: string[];
  addClasses: string;
}
export const decorate = ({ children, filter, addClasses }: decorateArgs) =>
  React.Children.map<any, JSX.Element>(children as any, child => {
    if (!filter || filter.includes(child.props.originalType || child.type)) {
      return React.cloneElement(child, {
        ...child.props,
        className: addClasses + (child.props.className || "")
      });
    }
    return child;
  });
