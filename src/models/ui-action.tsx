import { Icon } from '@components/icon';

type UIActionExecute<TParams = void, TReturn = void> =
    | (() => TReturn)
    | (() => Promise<TReturn>)
    | ((params: TParams) => TReturn)
    | ((params: TParams) => Promise<TReturn>);

type UIAction<TParams = void, TReturn = void> = {
    icon: React.ComponentProps<typeof Icon>['icon'];
    label: string;
    execute: UIActionExecute<TParams, TReturn>;
    isDisabled: boolean;
    isHidden: boolean;
    isLoading: boolean;
};

export { type UIAction };
