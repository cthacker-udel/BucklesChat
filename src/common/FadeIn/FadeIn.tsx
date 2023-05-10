/**
 * @author Graham Kaemmer, https://github.com/gkaemmer/react-fade-in#readme
 * I imported this project directly due to it's failed support of React 18
 */

/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */
import React, {
    type JSXElementConstructor,
    type PropsWithChildren as PropertiesWithChildren,
    useEffect,
    useState,
} from "react";

interface Properties {
    delay?: number;
    transitionDuration?: number;
    wrapperTag?: JSXElementConstructor<any>;
    childTag?: JSXElementConstructor<any>;
    className?: string;
    childClassName?: string;
    visible?: boolean;
    onComplete?: () => any;
}

/**
 *
 * @param properties
 * @returns
 */
export const FadeIn = (
    properties: PropertiesWithChildren<Properties>,
): JSX.Element => {
    const {
        children,
        delay,
        transitionDuration,
        wrapperTag,
        childTag,
        className,
        childClassName,
        visible,
        onComplete,
    } = properties;
    const [maxIsVisible, setMaxIsVisible] = useState(0);
    const updatedTransitionDuration =
        typeof transitionDuration === "number" ? transitionDuration : 400;
    const updatedDelay = typeof delay === "number" ? delay : 50;
    const UpdatedWrapperTag = wrapperTag ?? "div";
    const UpdatedChildTag = childTag ?? "div";
    const updatedVisible = visible === undefined ? true : visible;

    useEffect(() => {
        let count = React.Children.count(children);
        if (!updatedVisible) {
            // Animate all children out
            count = 0;
        }

        if (count === maxIsVisible) {
            // We're done updating maxVisible, notify when animation is done
            const timeout = setTimeout(() => {
                if (onComplete) {
                    onComplete();
                }
            }, updatedTransitionDuration);
            return () => {
                clearTimeout(timeout);
            };
        }

        // Move maxIsVisible toward count
        const increment = count > maxIsVisible ? 1 : -1;
        const timeout = setTimeout(() => {
            setMaxIsVisible(maxIsVisible + increment);
        }, updatedDelay);
        return () => {
            clearTimeout(timeout);
        };
    }, [
        children,
        updatedDelay,
        maxIsVisible,
        updatedVisible,
        updatedTransitionDuration,
        onComplete,
    ]);

    return (
        <UpdatedWrapperTag className={className}>
            {React.Children.map(children, (child, index) => (
                <UpdatedChildTag
                    className={childClassName}
                    style={{
                        opacity: maxIsVisible > index ? 1 : 0,
                        transform:
                            maxIsVisible > index ? "none" : "translateY(20px)",
                        transition: `opacity ${updatedTransitionDuration}ms, transform ${updatedTransitionDuration}ms`,
                    }}
                >
                    {child}
                </UpdatedChildTag>
            ))}
        </UpdatedWrapperTag>
    );
};
