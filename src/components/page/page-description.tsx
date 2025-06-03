type PageDescriptionProps = {
    text: string;
};

export const PageDescription = (props: PageDescriptionProps) => {
    return <p className="text-on-surface-0-variant max-w-prose text-sm">{props.text}</p>;
};
