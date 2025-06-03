type PageTitleProps = {
    text: string;
};

export const PageTitle = (props: PageTitleProps) => {
    return <h1 className="text-on-surface-0 line-clamp-1 max-w-prose text-xl">{props.text}</h1>;
};
