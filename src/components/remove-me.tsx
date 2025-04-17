import { useState } from 'react';

const RemoveMe = () => {
    const [count, setCount] = useState(0);
    const title = import.meta.env.VITE_TITLE;

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center">
            <div className="flex max-w-80 flex-col items-center gap-4">
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <h1 className="text-xl font-bold uppercase">{title}</h1>
                <p className="bg-surface-1 text-on-surface-1 w-full rounded-sm px-6 py-4 text-center text-sm">
                    Edit <code className="text-primary font-bold">src/app.tsx</code> and save to
                    test HMR
                </p>
                <button
                    className="bg-primary text-on-primary hover:bg-primary/80 h-12 cursor-pointer rounded-sm px-6 active:scale-95"
                    onClick={() => setCount((count) => count + 1)}
                >
                    <span className="text-sm font-medium">You clicked {count} times</span>
                </button>
            </div>
        </div>
    );
};

export default RemoveMe;
