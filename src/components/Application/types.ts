interface IApplicationProps {
    node: ({ }: { appId: string }) => JSX.Element;
    title: string;
    id: string;
    x?: number;
    y?: number;
}

export type { IApplicationProps };